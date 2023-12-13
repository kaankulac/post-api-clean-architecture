import { MongoHelper } from '@infrastructure/repositories';
import {
    CheckUserByUsernameRepository,
    CreateUserRepository,
    GetIdByUsernameRepository,
    LoadUserByTokenRepository,
    LoadUserByUsernameRepository,
    UpdateAccessTokenRepository
} from '@data/protocols';
import { ObjectId } from 'mongodb';
import { User } from '@domain/schemas';

export class UserMongoRepository
    implements
        CheckUserByUsernameRepository,
        CreateUserRepository,
        GetIdByUsernameRepository,
        LoadUserByTokenRepository,
        LoadUserByUsernameRepository,
        UpdateAccessTokenRepository
{
    async create(data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
        const result = await User.create(data);
        return result._id !== null;
    }

    async loadByUsername(username: LoadUserByUsernameRepository.Params): Promise<LoadUserByUsernameRepository.Result> {
        console.log(username);
        const user = await User.findOne(
            {
                username
            },
            {
                _id: 1,
                username: 1,
                password: 1
            }
        );
        console.log(user);
        return user && MongoHelper.map(user);
    }

    async getIdByUsername(username: GetIdByUsernameRepository.Params): Promise<GetIdByUsernameRepository.Result> {
        const user = await User.findOne(
            { username },
            {
                _id: 1
            }
        );

        return user && user._id.toHexString();
    }

    async checkByUserName(username: string): Promise<boolean> {
        const user = await User.findOne({ username }, { projection: { _id: 1 } }, { lean: true });
        return user !== null;
    }

    async updateAccessToken(data: UpdateAccessTokenRepository.Params): Promise<void> {
        await User.updateOne({ _id: new ObjectId(data.id) }, { $set: { accessToken: data.token } });
    }

    async loadByToken(token: LoadUserByTokenRepository.Params): Promise<LoadUserByTokenRepository.Result> {
        const user = await User.findOne(
            {
                accessToken: token
            },
            { _id: 1 }
        );

        return user && MongoHelper.map(user);
    }
}
