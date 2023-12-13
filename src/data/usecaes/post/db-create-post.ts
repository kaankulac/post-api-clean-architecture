import { CreatePost } from '@domain/usecases';
import { CreatePostRepository } from '@data/protocols';

export class DbCreatePost implements CreatePost {
    constructor(private readonly createPostRepository: CreatePostRepository) {}

    async create(data: CreatePost.Params): Promise<CreatePost.Result> {
        const isValid = await this.createPostRepository.create(data);
        return isValid;
    }
}
