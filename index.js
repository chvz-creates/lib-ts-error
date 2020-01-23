"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateError extends Error {
    constructor(className, propertyName, stateType, message) {
        super(`${className}.${propertyName} - `);
        this._stateType = -1;
        this.StateType = stateType;
        if (!message) {
            this.message = ` property ${propertyName} is in a ${this.getStateTypeString()}`;
        }
    }
    static get STATE_READONLY() {
        return 4;
    }
    /** @throws {CommonError} not set. */
    getStateTypeString() {
        switch (this.StateType) {
            case StateError.STATE_READONLY:
                return "READ_ONLY";
            default:
                return "UNKNOWN";
        }
    }
    /** @throws {RangeError} invalid StateType */
    set StateType(state_num) {
        const states = [
            StateError.STATE_READONLY
        ];
        if (states.find(s => s == state_num)) {
            this._stateType = state_num;
        }
        else {
            throw new RangeError(`${StateError.name}.StateType - ${state_num} is not a valid StateType`);
        }
    }
    /** @throws {CommonError} not set. */
    get StateType() {
        if (this._stateType > -1) {
            return this._stateType;
        }
        else {
            throw new CommonError(StateError.name, "StateType");
        }
    }
}
exports.StateError = StateError;
class CommonError extends ReferenceError {
    constructor(className, propertyName, message) {
        super(`${className}.${propertyName} - `
            + ` ${message ? message : "has not been set. UNDEFINED."}`);
    }
}
exports.CommonError = CommonError;
