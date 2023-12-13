import { Controller } from '@presentation/protocols';

export const adoptResolver = async (controller: Controller, args?: any, context?: any): Promise<any> => {
    const request = {
        ...(args || {}),
        userId: context?.req?.userId
    };
    const httpResponse = await controller.handle(request);
    switch (httpResponse.statusCode) {
        case 200:
        case 204:
            return httpResponse.body;
        case 400:
            throw new Error(httpResponse.body.message);
        case 401:
            throw new Error(httpResponse.body.message);
        case 403:
            throw new Error(httpResponse.body.message);
        default:
            throw new Error(httpResponse.body.message);
    }
};
