export class NotFoundError extends Error {
    constructor(stack: string) {
        super('Not Found');
        this.name = 'NotFoundError';
        this.message = stack;
        this.stack = stack;
    }
}
