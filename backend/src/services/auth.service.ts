import { prisma } from '../config/database';
import { getRedis } from '../config/redis';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from '../utils/error';
import { logger } from '../utils/logger';

export class AuthService {
  async register(data: any) {
    const { email, password, firstName, lastName, role, ...rest } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('Email already registered', 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        role: role || 'STUDENT',
        isVerified: true,
        ...(role === 'STUDENT' && {
          student: {
            create: {
              rollNumber: rest.rollNumber,
              departmentId: rest.departmentId,
              semester: rest.semester,
              admissionYear: rest.admissionYear,
              dob: new Date(rest.dob),
              gender: rest.gender,
              guardianName: rest.guardianName,
              guardianPhone: rest.guardianPhone,
            },
          },
        }),
        ...(role === 'FACULTY' && {
          faculty: {
            create: {
              departmentId: rest.departmentId,
              designation: rest.designation,
              qualification: rest.qualification,
              experience: rest.experience,
              joiningDate: new Date(rest.joiningDate),
            },
          },
        }),
      },
      include: { student: true, faculty: true },
    });

    return { id: user.id, email: user.email, firstName, lastName, role: user.role };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true, faculty: true },
    });
    if (!user || !user.isActive) throw new AppError('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
      config.jwt.accessSecret,
      { expiresIn: '15m' as any }
    );
    const refreshToken = jwt.sign(
      { sub: user.id },
      config.jwt.refreshSecret,
      { expiresIn: '7d' as any }
    );

    const redis = getRedis();
    await redis.set(`refresh:${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    return {
      user: { id: user.id, email, firstName: user.firstName, lastName: user.lastName, role: user.role, student: user.student, faculty: user.faculty },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as { sub: string };
      const redis = getRedis();
      const stored = await redis.get(`refresh:${decoded.sub}`);
      if (!stored || stored !== refreshToken) throw new AppError('Invalid refresh token', 401);

      const user = await prisma.user.findUnique({ where: { id: decoded.sub }, select: { id: true, email: true, role: true, firstName: true, lastName: true } });
      if (!user) throw new AppError('User not found', 401);

      const newAccessToken = jwt.sign(
        { sub: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
        config.jwt.accessSecret,
        { expiresIn: '15m' as any }
      );
      return { accessToken: newAccessToken };
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) throw new AppError('Invalid refresh token', 401);
      throw err;
    }
  }

  async logout(userId: string) {
    const redis = getRedis();
    await redis.del(`refresh:${userId}`);
  }
}
