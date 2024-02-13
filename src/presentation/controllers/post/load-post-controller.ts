import { Controller, HttpResponse, Validation } from '@presentation/protocols';
import { serverError, badRequest, ok } from '@presentation/helpers';
import { LoadPosts } from '@domain/usecases';

export class LoadPostsController implements Controller {
    constructor(
        private readonly loadPosts: LoadPosts,
        private readonly validation: Validation
    ) {}

    async handle(request: LoadPostsController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const result = await this.loadPosts.loadPosts({ page: Number(request.page), per: Number(request.per) });
            return ok(result);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace LoadPostsController {
    export type Request = {
        per: string;
        page: string;
    };
}
