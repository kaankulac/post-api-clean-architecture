import { MongoHelper } from '@infrastructure/repositories';
import {
    AddFollowerRepository,
    CheckUserByUsernameRepository,
    CreateUserRepository,
    FollowUserRepository,
    GetIdByUsernameRepository,
    LoadUserByTokenRepository,
    LoadUserByUsernameRepository,
    RemoveFollowerRepository,
    UnfollowUserRepository,
    UpdateAccessTokenRepository
} from '@data/protocols';
import { ObjectId } from 'mongodb';
import { User } from '@domain/schemas';
import { LoadUserByIdRepository } from '@data/protocols/repositories/user/load-user-by-id-repository';

export class UserMongoRepository
    implements
        CheckUserByUsernameRepository,
        CreateUserRepository,
        GetIdByUsernameRepository,
        LoadUserByTokenRepository,
        LoadUserByUsernameRepository,
        UpdateAccessTokenRepository,
        FollowUserRepository,
        UnfollowUserRepository,
        AddFollowerRepository,
        RemoveFollowerRepository,
        LoadUserByIdRepository
{
    async create(data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
        const result = await User.create(data);
        return result._id !== null;
    }

    async loadByUsername(username: LoadUserByUsernameRepository.Params): Promise<LoadUserByUsernameRepository.Result> {
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
        const user = await User.findOne({ username }, { _id: 1 }, { lean: true });
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
            { projection: { _id: 1 } }
        );

        return user && MongoHelper.map(user);
    }

    async loadById(id: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
        const user = await User.findOne({ _id: id }, { projection: { username: 1 } }, { lean: true });
        return user && MongoHelper.map(user);
    }

    async follow(data: FollowUserRepository.Params): Promise<void> {
        await User.findByIdAndUpdate(data.followedBy, { $push: { followings: data.followed } }).lean();
    }

    async unfollow(data: UnfollowUserRepository.Params): Promise<void> {
        await User.findByIdAndUpdate(data.followedBy, { $pull: { followings: data.followed } }).lean();
    }

    async addFollower(data: AddFollowerRepository.Params): Promise<void> {
        await User.findByIdAndUpdate(data.followed, { $push: { followers: data.followedBy } });
    }

    async removeFollower(data: RemoveFollowerRepository.Params): Promise<void> {
        await User.findByIdAndUpdate(data.followed, { $pull: { followers: data.followedBy } });
    }
}
