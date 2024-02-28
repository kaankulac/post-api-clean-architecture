import { MongoHelper } from './mongo-helper';
import {
    CreatePostRepository,
    DeletePostRepository,
    EditPostRepository,
    LoadPostByIdRepository,
    LoadPostsByUserRepository,
    LikePostRepository,
    UnlikePostRepository,
    LoadPostRepository
} from '@data/protocols';
import { Post } from '@domain/schemas';
import { ObjectId } from 'mongodb';

export class PostMongoRepository
    implements
        CreatePostRepository,
        DeletePostRepository,
        EditPostRepository,
        LoadPostByIdRepository,
        LoadPostsByUserRepository,
        LikePostRepository,
        UnlikePostRepository,
        LoadPostRepository
{
    async create(data: CreatePostRepository.Params): Promise<CreatePostRepository.Result> {
        const result = await Post.create(data);
        return result && result._id !== null;
    }

    async delete(postId: string): Promise<boolean> {
        const result = await Post.deleteOne({ _id: postId });
        return result.deletedCount > 0;
    }

    async edit(data: EditPostRepository.Params): Promise<boolean> {
        const result = await Post.updateOne(
            { _id: data.id },
            { $set: { title: data.title, description: data.description } }
        );
        return result.modifiedCount > 0;
    }

    async loadById(postId: string): Promise<LoadPostByIdRepository.Result> {
        const result = await Post.findById(postId).lean();
        return result && MongoHelper.map(result);
    }

    async loadByUser(userId: string): Promise<LoadPostsByUserRepository.Result> {
        const result = await Post.find({ author: userId });
        return result.length > 0 ? MongoHelper.mapCollection(result) : [];
    }

    async likePost(data: LikePostRepository.Params): Promise<LikePostRepository.Result> {
        const result = await Post.updateOne(
            { _id: data.post },
            { $inc: { totalLikes: 1 }, $push: { likes: data.user } }
        );
        return result.modifiedCount > 0;
    }

    async unlikePost(data: UnlikePostRepository.Params): Promise<UnlikePostRepository.Result> {
        const result = await Post.updateOne(
            {
                _id: data.post
            },
            { $inc: { totalLikes: -1 }, $pull: { likes: data.user } }
        );
        return result.modifiedCount > 0;
    }

    async loadPosts(data: LoadPostRepository.Params): Promise<LoadPostRepository.Result> {
        const posts = await Post.find({})
            .skip(data.pagination.per * data.pagination.page)
            .limit(data.pagination.per)
            .lean();
        const totalCount = await await Post.find({}).lean().countDocuments();
        return {
            posts,
            totalCount
        };
    }
}
