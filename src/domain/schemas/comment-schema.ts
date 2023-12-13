import { Types, Schema, model } from 'mongoose';
import { CommentDocument } from '@domain/models';

const CommentSchema = new Schema(
    {
        comment: { type: String, required: true, minLength: 8, maxLength: 80 },
        author: { type: Types.ObjectId, required: true, ref: 'User' },
        post: { type: Types.ObjectId, required: true, ref: 'Post' },
        replyTo: { type: Types.ObjectId, ref: 'Comment' },
        totalLikes: { type: Number, default: 0 },
        totalComments: { type: Number, default: 0 },
        likes: { type: [Types.ObjectId], default: [], ref: 'User' },
        comments: { type: [Types.ObjectId], defualt: [], ref: 'Comment' }
    },
    { timestamps: true }
);

export const Comment = model<CommentDocument>('Comment', CommentSchema);
