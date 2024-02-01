import {
    CreateCommentRepository,
    EditCommentRepository,
    DeleteCommentRepository,
    LoadCommentByIdRepository,
    LoadCommentsByCommentRepository,
    LoadCommentsByPostRepository,
    LoadCommentsByUserRepository,
    LikeCommentRepository,
    UnlikeCommentRepository
} from '@data/protocols';

import { faker } from '@faker-js/faker';
import { mockCommentModel, mockCommentModels } from '@test/domain/mocks';

export class CreateCommentRepositorySpy implements CreateCommentRepository {
    params: CreateCommentRepository.Params;
    result = true;

    async create(params: CreateCommentRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class EditCommentRepositorySpy implements EditCommentRepository {
    params: EditCommentRepository.Params;
    result = true;

    async edit(params: EditCommentRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class DeleteCommentRepositorySpy implements DeleteCommentRepository {
    commentId: DeleteCommentRepository.Params;
    result = true;

    async delete(commentId: DeleteCommentRepository.Params): Promise<boolean> {
        this.commentId = commentId;
        return this.result;
    }
}

export class LoadCommentByIdRepositorySpy implements LoadCommentByIdRepository {
    id: LoadCommentByIdRepository.Params;
    result = mockCommentModel();

    async loadById(id: string): Promise<LoadCommentByIdRepository.Result> {
        this.id = id;
        return this.result;
    }
}

export class LoadCommentsByCommentRepositorySpy implements LoadCommentsByCommentRepository {
    id: string;
    result = mockCommentModels();

    async loadByComment(id: string): Promise<LoadCommentsByCommentRepository.Result> {
        this.id = id;
        return this.result;
    }
}

export class LoadCommentsByPostRepositorySpy implements LoadCommentsByPostRepository {
    id: string;
    result = mockCommentModels();

    async loadByPost(id: string): Promise<LoadCommentsByPostRepository.Result> {
        this.id = id;
        return this.result;
    }
}

export class LoadCommentsByUserRepositorySpy implements LoadCommentsByUserRepository {
    id: string;
    result = mockCommentModels();

    async loadByUser(id: string): Promise<LoadCommentsByUserRepository.Result> {
        this.id = id;
        return this.result;
    }
}

export class LikeCommentRepositorySpy implements LikeCommentRepository {
    params: LikeCommentRepository.Params;
    result = true;

    async likeComment(params: LikeCommentRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class UnlikeCommentRepositorySpy implements UnlikeCommentRepository {
    params: UnlikeCommentRepository.Params;
    result = true;

    async unlikeComment(params: UnlikeCommentRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}
