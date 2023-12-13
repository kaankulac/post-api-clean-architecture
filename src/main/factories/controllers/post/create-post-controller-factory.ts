import { Controller } from '@presentation/protocols';
import { makeCreatePostValidation, makeLogControllerDecorator, makeDbCreatePost } from '@main/factories';
import { CreatePostController } from '@presentation/controllers';

export const makeCraetePostController = (): Controller => {
    const controller = new CreatePostController(makeDbCreatePost(), makeCreatePostValidation());
    return makeLogControllerDecorator(controller);
};
