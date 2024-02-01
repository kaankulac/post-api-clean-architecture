import { Types } from 'mongoose';

export interface Follower {
    user: Types.ObjectId;
    since: Date;
}

export interface UserDocument {
    id?: Types.ObjectId | string;
    username: string;
    password: string;
    accessToken: string;
    totalLikes: number;
    posts: Types.ObjectId[]; // array of post ids
    likes: Types.ObjectId[]; // array of liked post ids
    comments: Types.ObjectId; // array of user's commnent ids
    followers: Follower[];
    followings: Follower[];
    createdAt: Date;
    updatedAt: Date;
}
