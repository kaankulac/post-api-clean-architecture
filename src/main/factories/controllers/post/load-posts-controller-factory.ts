import { Controller } from '@presentation/protocols';
import { makeLogControllerDecorator, makeLoadPostsValidation, makeDbLoadPosts } from '@main/factories';
import { LoadPostsController } from '@presentation/controllers';

export const makeLoadPostsController = (): Controller => {
    const controller = new LoadPostsController(makeDbLoadPosts(), makeLoadPostsValidation());
    return makeLogControllerDecorator(controller);
};
