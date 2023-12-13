import { object, string } from 'yup';

export const CreatePostSchema = object({
    title: string().required(),
    description: string().required()
});
