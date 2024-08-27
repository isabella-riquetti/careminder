export default abstract class AbstractError extends Error {
    cause?: any;
    data?: any;

    constructor(message: string, cause?: any, data?: any) {
        super(message);
        this.name = this.constructor.name;
        this.data = data;
        if (cause) {
            this.cause = { name: cause.name, message: cause.message, stack: cause.stack, code: cause.code };
            const causeData = cause.data ?? cause.response?.data;
            if (causeData) this.cause.data = causeData;
        }

        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);

        if (this.cause?.stack) {
            this.stack = `${this.stack}\nCaused by: ${this.cause.stack}`;
        }

        if (this.cause?.data) {
            this.stack = `${this.stack}\nCause data: ${JSON.stringify(this.cause.data, null, 4)}`;
        }
    }
}
