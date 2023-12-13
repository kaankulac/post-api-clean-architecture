import { object, string, ref } from 'yup';

export const SignUpSchema = object({
    username: string().required().lowercase().trim().min(6).max(16),
    password: string()
        .required()
        .min(8, 'Password must contain at least 8 characters')
        .max(20, 'The password must contain a maximum of 20 characters'),
    passwordConfirmation: string()
        .required()
        .oneOf([ref('password'), null], 'Passwords must match')
});
