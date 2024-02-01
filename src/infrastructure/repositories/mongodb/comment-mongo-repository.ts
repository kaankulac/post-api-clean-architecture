import { CommentDocument } from '@domain/models';
import { MongoHelper } from './mongo-helper';
import {
    CreateCommentRepository,
    DeleteCommentRepository,
    EditCommentRepository,
    LoadCommentByIdRepository,
    LoadCommentsByCommentRepository,
    LoadCommentsByPostRepository,
    LoadCommentsByUserRepository,
    LikeCommentRepository,
    UnlikeCommentRepository
} from '@data/protocols';
import { Comment } from '@domain/schemas';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export class CommentMongoRepository
    implements
        CreateCommentRepository,
        DeleteCommentRepository,
        EditCommentRepository,
        LoadCommentByIdRepository,
        LoadCommentsByCommentRepository,
        LoadCommentsByPostRepository,
        LoadCommentsByUserRepository,
        LikeCommentRepository,
        UnlikeCommentRepository
{
    async create(data: CreateCommentRepository.Params): Promise<boolean> {
        const result = await Comment.create(data);
        return result && result._id !== null;
    }

    async delete(commentId: string): Promise<boolean> {
        const result = await Comment.deleteMany({ _id: new ObjectId(commentId) });
        return result.deletedCount > 0;
    }

    async edit(data: EditCommentRepository.Params): Promise<boolean> {
        const result = await Comment.updateOne(
            { _id: new ObjectId(data.commentId) },
            { $set: { comment: data.comment } }
        );
        return result.modifiedCount > 0;
    }

    async loadById(commentId: string): Promise<LoadCommentByIdRepository.Result> {
        const result: HydratedDocument<CommentDocument> | null = await Comment.findById(commentId).lean();

        return result && MongoHelper.map(result);
    }

    async loadByComment(repliedCommentId: string): Promise<LoadCommentsByCommentRepository.Result> {
        const result = await Comment.find({ replyTo: repliedCommentId });

        return result.length > 0 ? MongoHelper.mapCollection(result) : [];
    }

    async loadByPost(postId: string): Promise<LoadCommentsByPostRepository.Result> {
        const result = await Comment.find({ post: new ObjectId(postId) });
        return result.length > 0 ? MongoHelper.mapCollection(result) : [];
    }

    async loadByUser(userId: string): Promise<LoadCommentsByUserRepository.Result> {
        const result = await Comment.find({ author: new ObjectId(userId) });
        return result.length > 0 ? MongoHelper.mapCollection(result) : [];
    }

    async likeComment(data: LikeCommentRepository.Params): Promise<boolean> {
        const result = await Comment.updateOne(
            { _id: new ObjectId(data.comment) },
            { $inc: { totalLikes: 1 }, $push: { likes: data.user } }
        );
        return result.modifiedCount > 0;
    }

    async unlikeComment(data: UnlikeCommentRepository.Params): Promise<boolean> {
        const result = await Comment.updateOne(
            {
                _id: new ObjectId(data.comment)
            },
            { $inc: { totalLikes: -1 }, $pull: { likes: data.user } }
        );
        return result.modifiedCount > 0;
    }
}
