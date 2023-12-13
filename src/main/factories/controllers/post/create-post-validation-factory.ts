import { ValidationComposite, CompareFieldsValidation } from '@validation/validators';
import { Validation } from '@presentation/protocols';
import { CreatePostSchema } from '@domain/validation-schemas';

export const makeCreatePostValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new CompareFieldsValidation(CreatePostSchema));
    return new ValidationComposite(validations);
};
