import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import Logger from '../../loaders/logger';


@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err: any) => any) {

        Logger.error(error.message || error);
        if (error && error.isJoi) {
            error.status = 400;
        } else if (
            error && error.message &&
            error.message.toLowerCase().includes('invalid password') || error.message.toLowerCase().includes('user not registered')
        ) {
            error.status = 403;
        }
        next(error);
    }

}
