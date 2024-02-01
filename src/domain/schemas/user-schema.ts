import { Schema, Types, model } from 'mongoose';
import { UserDocument } from '@domain/models';

const FollowerSchema = new Schema(
    {
        user: { type: Types.ObjectId, required: true, ref: 'User' },
        since: { type: Date, default: Date.now() }
    },
    { timestamps: false, _id: false }
);

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        accessToken: { type: String },
        totalLikes: { type: Number, default: 0 },
        posts: { type: [Types.ObjectId], default: [], ref: 'Post' },
        likes: { type: [Types.ObjectId], default: [], ref: 'Post' },
        comments: { type: [Types.ObjectId], default: [], ref: 'Comment' },
        followers: { type: [FollowerSchema], default: [] },
        followings: { type: [FollowerSchema], default: [] }
    },
    { timestamps: true }
);

export const User = model<UserDocument>('User', UserSchema);
