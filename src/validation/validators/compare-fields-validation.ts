import { Validation } from '@presentation/protocols';
import yup, { AnySchema, ValidationError } from 'yup';

export class CompareFieldsValidation implements Validation {
    constructor(private readonly schema: AnySchema) {}

    validate(input: any): Error {
        try {
            this.schema.validateSync(input);
            return null;
        } catch (e: Error | any) {
            return new Error(e || 'unidentified error');
        }
    }
}
