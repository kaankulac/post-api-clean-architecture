import { FollowSchema } from '@domain/validation-schemas';
import { Validation } from '@presentation/protocols';
import { CompareFieldsValidation, ValidationComposite } from '@validation/validators';

export const makeFollowValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new CompareFieldsValidation(FollowSchema));
    return new ValidationComposite(validations);
};
