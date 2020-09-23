export interface Action<T> {
    type: T;
}
export interface ActionWithPayload<T, P> extends Action<T> {
    payload: P;
}

// export type A = Action | ActionWithPayload;

export function createAction<T>(type: T): Action<T>
export function createAction<T, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T, P>(type: T, payload?: P) {
    return payload === undefined ? {type} : {type, payload};
}