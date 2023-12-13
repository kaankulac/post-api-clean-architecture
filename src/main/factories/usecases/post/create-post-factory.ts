import { CreatePost } from '@domain/usecases';
import { DbCreatePost } from '@data/usecaes';
import { PostMongoRepository } from '@infrastructure/repositories';

export const makeDbCreatePost = (): CreatePost => {
    const postMongoRepsitory = new PostMongoRepository();
    return new DbCreatePost(postMongoRepsitory);
};
