import { LogControllerDecorator } from '@main/decorators';
import { LogMongoRepository } from '@infrastructure/repositories/mongodb/log-mongo-repository';
import { Controller } from '@presentation/protocols';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
    const logMongoRepostiroy = new LogMongoRepository();
    return new LogControllerDecorator(controller, logMongoRepostiroy);
};
