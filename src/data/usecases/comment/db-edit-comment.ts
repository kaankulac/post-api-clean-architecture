import { EditComment } from '@domain/usecases';
import { EditCommentRepository } from '@data/protocols';

export class DbEditComment implements EditComment {
    constructor(private readonly editCommentRepository: EditCommentRepository) {}

    async edit(data: EditComment.Params): Promise<EditComment.Result> {
        let isValid = false;
        isValid = await this.editCommentRepository.edit(data);
        return isValid;
    }
}
