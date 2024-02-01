import { Types } from 'mongoose';

export interface CommentDocument {
    id?: Types.ObjectId | string;
    comment: string;
    author: Types.ObjectId | string; // user id
    post: Types.ObjectId | string; // post id
    commentId?: Types.ObjectId | string; // post id
    replyTo?: Types.ObjectId | string;
    totalLikes: number;
    totalComments: number;
    likes: Types.ObjectId[] | string[]; // array of user ids
    comments: Types.ObjectId[] | string[]; // array of comment ids
    createdAt: Date;
    updatedAt: Date;
}
