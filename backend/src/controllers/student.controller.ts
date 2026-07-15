import { Request, Response, NextFunction } from 'express';

export class StudentController {
  async getStudents(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ success: true, data: [] });
  }
  async getStudentById(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ success: true, data: {} });
  }
}
