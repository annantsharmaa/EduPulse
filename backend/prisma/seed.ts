import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create departments
  const cse = await prisma.department.upsert({
    where: { code: 'CSE' },
    update: {},
    create: { name: 'Computer Science & Engineering', code: 'CSE', description: 'CSE Department' },
  });

  const ece = await prisma.department.upsert({
    where: { code: 'ECE' },
    update: {},
    create: { name: 'Electronics & Communication', code: 'ECE', description: 'ECE Department' },
  });

  const me = await prisma.department.upsert({
    where: { code: 'ME' },
    update: {},
    create: { name: 'Mechanical Engineering', code: 'ME', description: 'ME Department' },
  });

  // Create ADMIN
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@edupulse.com' },
    update: {},
    create: {
      email: 'admin@edupulse.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      firstName: 'Vikram',
      lastName: 'Patel',
      isVerified: true,
    },
  });
  console.log('✅ Admin created');

  // Create FACULTY
  const facultyPassword = await bcrypt.hash('Faculty@123', 12);
  const facultyUser = await prisma.user.upsert({
    where: { email: 'faculty@edupulse.com' },
    update: {},
    create: {
      email: 'faculty@edupulse.com',
      passwordHash: facultyPassword,
      role: 'FACULTY',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      isVerified: true,
    },
  });

  // Create faculty profile
  await prisma.faculty.upsert({
    where: { userId: facultyUser.id },
    update: {},
    create: {
      userId: facultyUser.id,
      departmentId: cse.id,
      designation: 'Professor',
      qualification: ['PhD Computer Science'],
      experience: 15,
      specialization: ['AI', 'Machine Learning'],
      joiningDate: new Date('2018-01-15'),
    },
  });
  console.log('✅ Faculty created');

  // Create HOD
  const hodPassword = await bcrypt.hash('HOD@123', 12);
  const hodUser = await prisma.user.upsert({
    where: { email: 'hod@edupulse.com' },
    update: {},
    create: {
      email: 'hod@edupulse.com',
      passwordHash: hodPassword,
      role: 'FACULTY',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      isVerified: true,
    },
  });

  // Create HOD faculty profile (same person but with HOD designation)
  await prisma.faculty.upsert({
    where: { userId: hodUser.id },
    update: { designation: 'Professor & HOD' },
    create: {
      userId: hodUser.id,
      departmentId: cse.id,
      designation: 'Professor & HOD',
      qualification: ['PhD Computer Science', 'MTech AI'],
      experience: 15,
      specialization: ['AI', 'ML', 'Data Science'],
      joiningDate: new Date('2018-01-15'),
    },
  });
  console.log('✅ HOD created');

  // Create STUDENT
  const studentPassword = await bcrypt.hash('Student@123', 12);
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@edupulse.com' },
    update: {},
    create: {
      email: 'student@edupulse.com',
      passwordHash: studentPassword,
      role: 'STUDENT',
      firstName: 'Ananya',
      lastName: 'Sharma',
      isVerified: true,
    },
  });

  // Create student profile
  await prisma.student.upsert({
    where: { rollNumber: '2021CSE045' },
    update: {},
    create: {
      userId: studentUser.id,
      rollNumber: '2021CSE045',
      departmentId: cse.id,
      semester: 5,
      admissionYear: 2021,
      dob: new Date('2002-03-15'),
      gender: 'FEMALE',
      guardianName: 'Rajesh Sharma',
      guardianPhone: '+91 9876543210',
      address: 'Jayanagar, Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  });
  console.log('✅ Student created');

  // Create second student (for parent with 2 children)
  const student2Password = await bcrypt.hash('Student@123', 12);
  const student2User = await prisma.user.upsert({
    where: { email: 'rohan@edupulse.com' },
    update: {},
    create: {
      email: 'rohan@edupulse.com',
      passwordHash: student2Password,
      role: 'STUDENT',
      firstName: 'Rohan',
      lastName: 'Sharma',
      isVerified: true,
    },
  });

  await prisma.student.upsert({
    where: { rollNumber: '2023CSE012' },
    update: {},
    create: {
      userId: student2User.id,
      rollNumber: '2023CSE012',
      departmentId: cse.id,
      semester: 3,
      admissionYear: 2023,
      dob: new Date('2004-07-20'),
      gender: 'MALE',
      guardianName: 'Rajesh Sharma',
      guardianPhone: '+91 9876543210',
      address: 'Jayanagar, Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  });
  console.log('✅ Second student created');

  // Create PARENT
  const parentPassword = await bcrypt.hash('Parent@123', 12);
  await prisma.user.upsert({
    where: { email: 'parent@edupulse.com' },
    update: {},
    create: {
      email: 'parent@edupulse.com',
      passwordHash: parentPassword,
      role: 'PARENT',
      firstName: 'Rajesh',
      lastName: 'Sharma',
      isVerified: true,
    },
  });
  console.log('✅ Parent created');

  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📋 Login Credentials:');
  console.log('  Admin:   admin@edupulse.com / Admin@123');
  console.log('  Faculty: faculty@edupulse.com / Faculty@123');
  console.log('  Student: student@edupulse.com / Student@123');
  console.log('  Parent:  parent@edupulse.com / Parent@123');
  console.log('  HOD:     hod@edupulse.com / HOD@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
