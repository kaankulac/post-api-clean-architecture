import { Controller, HttpResponse, Validation } from '@presentation/protocols';
import { badRequest, serverError, ok, forbidden } from '@presentation/helpers';
import { UsernameInUseError } from '@domain/errors';
import { CreateUser, Authentication } from '@domain/usecases';

export class SignUpController implements Controller {
    constructor(
        private readonly createUser: CreateUser,
        private readonly authentication: Authentication,
        private readonly validation: Validation
    ) {}

    async handle(request: SignUpController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const { username, password } = request;
            const isValid = await this.createUser.create({ username, password });

            if (!isValid) {
                return forbidden(new UsernameInUseError());
            }

            const authenticationModel = await this.authentication.auth({ username, password });
            return ok(authenticationModel);
        } catch (error) {
            console.log(error);
            return serverError(error as Error);
        }
    }
}

export namespace SignUpController {
    export type Request = {
        username: string;
        password: string;
        passwordConfirmation: string;
    };
}
