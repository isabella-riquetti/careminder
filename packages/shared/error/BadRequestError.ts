import WsError from "./WsError";

export default class BadRequestError extends WsError {
    constructor(message: string) {
        super(400, message);
    }
}
