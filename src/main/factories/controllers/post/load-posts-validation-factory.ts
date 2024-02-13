import { ValidationComposite, CompareFieldsValidation } from '@validation/validators';
import { Validation } from '@presentation/protocols';
import { LoadPostsSchema } from '@domain/validation-schemas';

export const makeLoadPostsValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new CompareFieldsValidation(LoadPostsSchema));
    return new ValidationComposite(validations);
};
