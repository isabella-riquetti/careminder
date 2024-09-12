import WsError from "./WsError";

export default class TooManyRequestsError extends WsError {
    constructor(action: string) {
        super(429, `You have exceeded your quota or rate limit for ${action}`);
    }
}
