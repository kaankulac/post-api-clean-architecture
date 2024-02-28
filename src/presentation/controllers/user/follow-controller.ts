import { Controller, HttpResponse, Validation } from '@presentation/protocols';
import { FollowUser, UnfollowUser } from '@domain/usecases';
import { badRequest, ok, serverError } from '@presentation/helpers';

export class FollowController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly follow: FollowUser,
        private readonly unfollow: UnfollowUser
    ) {}

    async handle(request: FollowController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            var success = false;
            if (request.isFollow) {
                success = await this.follow.follow({ followed: request.followed, followedBy: request.userId });
            } else {
                success = await this.unfollow.unfollow({ followed: request.followed, followedBy: request.userId });
            }
            return ok('success');
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace FollowController {
    export type Request = {
        followed: string;
        userId: string;
        isFollow: boolean;
    };
}
