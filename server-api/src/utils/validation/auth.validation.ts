import { z } from 'zod';

class AuthValidation {
  // region Register Validation
  static registerUser = z.object({
    firstname: z.string().min(3, 'Firstname is required').max(20, 'Name must be less than 50 characters'),
    lastname: z.string().min(3, 'Lastname is required').max(20, 'Name must be less than 50 characters').optional(),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });


  // region Login Validation
  static loginUser = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });
}

export default AuthValidation;