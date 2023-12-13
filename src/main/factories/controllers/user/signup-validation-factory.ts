import { ValidationComposite, CompareFieldsValidation } from '@validation/validators';
import { Validation } from '@presentation/protocols';
import { SignUpSchema } from '@domain/validation-schemas';

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new CompareFieldsValidation(SignUpSchema));
    return new ValidationComposite(validations);
};
