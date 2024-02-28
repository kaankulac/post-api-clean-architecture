import { FollowController } from '@presentation/controllers';
import { Controller } from '@presentation/protocols';
import {
    makeDbFollowUser,
    makeDbUnfollowUser,
    makeFollowValidation,
    makeLogControllerDecorator
} from '@main/factories';

export const makeFollowController = (): Controller => {
    const controller = new FollowController(makeFollowValidation(), makeDbFollowUser(), makeDbUnfollowUser());
    return makeLogControllerDecorator(controller);
};
