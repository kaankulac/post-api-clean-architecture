import { CreateUser } from '@domain/usecases';
import { CreateUserRepository, Hasher, CheckUserByUsernameRepository } from '@data/protocols';

export class DbCreateUser implements CreateUser {
    constructor(
        private readonly hasher: Hasher,
        private readonly createUserRepository: CreateUserRepository,
        private readonly checkUserByUsernameRepository: CheckUserByUsernameRepository
    ) {}

    async create(userData: CreateUser.Params): Promise<CreateUser.Result> {
        const exists = await this.checkUserByUsernameRepository.checkByUserName(userData.username);
        let isValid = false;
        if (!exists) {
            const hashedPassword = await this.hasher.hash(userData.password);
            isValid = await this.createUserRepository.create({ ...userData, password: hashedPassword });
        }
        return isValid;
    }
}
