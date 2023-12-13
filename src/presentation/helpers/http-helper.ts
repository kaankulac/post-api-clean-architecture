import { HttpResponse } from '@presentation/protocols';
import { NotFoundError, ServerError, UnauthorizedError } from '@domain/errors';

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
});

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
});

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack)
});

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: { message: 'Success' }
});

export const notFound = (stack: string): HttpResponse => ({
    statusCode: 404,
    body: Object.assign(new NotFoundError(stack), { code: 100 })
});

export const created = (): HttpResponse => ({
    statusCode: 201,
    body: { message: 'Success' }
});
