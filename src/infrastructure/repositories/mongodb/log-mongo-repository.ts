import { Log } from '@domain/schemas';
import { LogErrorRepository } from '@data/protocols/repositories/log';

export class LogMongoRepository implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        await Log.create({ stack });
    }
}
