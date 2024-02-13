import { object, string } from 'yup';

export const LoadPostsSchema = object({
    per: string().required(),
    page: string().required()
});
