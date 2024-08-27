import WsError from "./WsError";

export default class ForbiddenError extends WsError {
    constructor(message?: string) {
        super(403, message ?? "Forbidden");
    }
}
