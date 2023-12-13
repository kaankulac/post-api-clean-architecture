import { Types } from 'mongoose';

export interface PostDocument {
    id?: Types.ObjectId | string;
    title: string;
    description: string;
    author: Types.ObjectId | string; // user id
    totalLikes: number;
    totalComments: number;
    likes: Types.ObjectId[] | string[]; // array of user ids
    comments: Types.ObjectId[] | string[]; // array of comment ids
    createdAt: Date;
    updatedAt: Date;
}
