import { SignUpController } from '@presentation/controllers';
import { Controller } from '@presentation/protocols';
import {
    makeSignUpValidation,
    makeDbCreateUser,
    makeDbAuthentication,
    makeLogControllerDecorator
} from '@main/factories';

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(makeDbCreateUser(), makeDbAuthentication(), makeSignUpValidation());
    return makeLogControllerDecorator(controller);
};
