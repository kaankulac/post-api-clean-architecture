import { Types, Schema, model } from 'mongoose';
import { PostDocument } from '@domain/models';

const PostSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 6, maxLength: 16 },
        description: { type: String, required: true, minLength: 20, maxLength: 240 },
        author: { type: Types.ObjectId, required: true, ref: 'User' },
        totalLikes: { type: Number, default: 0 },
        totalComments: { type: Number, default: 0 },
        likes: { type: [Types.ObjectId], default: [], ref: 'User' },
        comments: { type: [Types.ObjectId], default: [], ref: 'Comment' }
    },
    { timestamps: true }
);

export const Post = model<PostDocument>('Post', PostSchema);
