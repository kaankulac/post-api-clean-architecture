import { CreateComment } from '@domain/usecases';
import { CreateCommentRepository } from '@data/protocols';

export class DbCreateComment implements CreateComment {
    constructor(private readonly createCommentRepository: CreateCommentRepository) {}

    async create(data: CreateComment.Params): Promise<CreateComment.Result> {
        let isValid = false;
        isValid = await this.createCommentRepository.create(data);
        return isValid;
    }
}
