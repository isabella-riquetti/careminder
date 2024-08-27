import WsError from "./WsError";

export default class NotFoundError extends WsError {
    constructor(entityOrMessage: string, id?: string | number) {
        const message = id ? `${entityOrMessage} with id=${id} was not found.` : entityOrMessage;
        super(404, message);
    }
}
