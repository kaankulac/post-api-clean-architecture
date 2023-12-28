import { boolean, object, string } from 'yup';

export const FollowSchema = object({
    userId: string().required(),
    followed: string().required(),
    isFollow: boolean().required()
});
