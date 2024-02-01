import { EditPost } from '@domain/usecases';
import { EditPostRepository, LoadPostByIdRepository } from '@data/protocols';

export class DbEditPost implements EditPost {
    constructor(
        private readonly editPostRepository: EditPostRepository,
        private readonly loadPostById: LoadPostByIdRepository
    ) {}

    async edit(data: EditPost.Params): Promise<EditPost.Result> {
        let isValid = false;
        const exists = await this.loadPostById.loadById(data.id);
        if (exists) {
            isValid = await this.editPostRepository.edit(data);
        }
        return isValid;
    }
}
