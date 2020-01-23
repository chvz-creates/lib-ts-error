/**@summary Static member of StateError class. */
export type StateType = number;

export class StateError extends Error{

    static get STATE_READONLY(){
        return 4
    }

    constructor(className:string
        , propertyName:string
        , stateType:StateType
        , message?:string){
        super(`${className}.${propertyName} - `);
        this.StateType = stateType;
        
        if (!message){
            this.message = ` property ${propertyName} is in a ${this.getStateTypeString()}`;
        }
    }

    /** @throws {CommonError} not set. */
    getStateTypeString(){
        switch (this.StateType){
            case StateError.STATE_READONLY:
                return "READ_ONLY"
            default:
                return "UNKNOWN"
        }
    }

    /** @throws {RangeError} invalid StateType */
    set StateType(state_num:StateType){
        const states = [
            StateError.STATE_READONLY
        ]

        if (states.find(s => s == state_num)){
            this._stateType = state_num;
        } else {
            throw new RangeError(
                `${StateError.name}.StateType - ${state_num} is not a valid StateType` );
        }
    }
    /** @throws {CommonError} not set. */
    get StateType(){
        if (this._stateType > -1){
            return this._stateType;
        } else {
            throw new CommonError(StateError.name,"StateType");
        }
    }

    private _stateType = -1;
}


export class CommonError extends ReferenceError{
    constructor(className:string, propertyName:string, message?:string){
        super(`${className}.${propertyName} - ` 
            +` ${message?message:"has not been set. UNDEFINED."}`);
    }
}