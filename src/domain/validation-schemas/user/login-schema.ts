import { object, string } from 'yup';

export const LoginSchema = object({
    username: string().required(),
    password: string().required()
});
