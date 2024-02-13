import { DbLoadPosts } from '@data/usecases';
import { LoadPosts } from '@domain/usecases';
import { PostMongoRepository } from '@infrastructure/repositories';

export const makeDbLoadPosts = (): LoadPosts => {
    const postMongoRepository = new PostMongoRepository();
    return new DbLoadPosts(postMongoRepository);
};
