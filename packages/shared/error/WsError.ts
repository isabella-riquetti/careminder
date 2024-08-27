import AbstractError from "./AbstractError";

export default class WsError extends AbstractError {
    status: number;
    body?: object;

    constructor(status: number = 500, messageOrBody: string | object, cause?: Error) {
        super(typeof messageOrBody === "string" ? messageOrBody : "Invalid payload", cause);
        this.status = status;
        this.body = typeof messageOrBody === "string" ? undefined : messageOrBody;
    }
}
