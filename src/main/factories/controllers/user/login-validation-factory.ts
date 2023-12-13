import { ValidationComposite, CompareFieldsValidation } from '@validation/validators';
import { Validation } from '@presentation/protocols';
import { LoginSchema } from '@domain/validation-schemas';

export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new CompareFieldsValidation(LoginSchema));
    return new ValidationComposite(validations);
};
