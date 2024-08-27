import WsError from "./WsError";

export default class UnauthorizedError extends WsError {
    constructor(message?: string) {
        super(401, message || "Unauthorized");
    }
}
