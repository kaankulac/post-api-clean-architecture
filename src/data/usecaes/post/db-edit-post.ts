import { EditPost } from '@domain/usecases';
import { EditPostRepository } from '@data/protocols';

export class DbEditPost implements EditPost {
    constructor(private readonly editPostRepository: EditPostRepository) {}

    async edit(data: EditPost.Params): Promise<EditPost.Result> {
        const result = await this.editPostRepository.edit(data);
        return result;
    }
}
