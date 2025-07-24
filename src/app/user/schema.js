import {z} from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(4, "Username must be at least 3 character long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 character long"),
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email format not valid'),
    password: z.string().min(1, 'Password cannot be empty')
  })
})

export const updateProfileSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
  }).refine(data => Object.keys(data).length > 0, { // Memastikan body tidak kosong
    message: 'At least one field (username or email) must be filled in.',
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, 'old password must be a at least 6 character'),
    newPassword: z.string().min(6, 'New password must be a at least 6 character'),
    confirmNewPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmNewPassword,{
    message: 'The confirmation of the new password is incorrect.',
    path:['confirmNewPassword'],
  })
})
