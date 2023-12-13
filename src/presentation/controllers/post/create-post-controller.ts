import { Controller, HttpResponse, Validation } from '@presentation/protocols';
import { serverError, badRequest, created } from '@presentation/helpers';
import { CreatePost } from '@domain/usecases';

export class CreatePostController implements Controller {
    constructor(private readonly createPost: CreatePost, private readonly validation: Validation) {}

    async handle(request: CreatePostController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const isValid = this.createPost.create({ ...request, author: request.userId });
            if (isValid) {
                return created();
            }
            return serverError(new Error('Something went wrong...'));
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace CreatePostController {
    export type Request = {
        title: string;
        description: string;
        userId: string;
    };
}
