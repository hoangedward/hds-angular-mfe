import { ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { AuthActionType } from '@micro-app/app-store';
// console.log all actions
export function debug(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
    return (state, action) => {
        console.log('action ::::::::', action);
        console.log('state before ::::::::', state);
        const result = reducer(state, action);
        console.log('state after ::::::::', result);
        return result;
    };
}

export function clearState(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
    return (state, action) => {
        if (action.type === AuthActionType.LogoutSuccess) {
            state = undefined;
        }
        return reducer(state, action);
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [debug, clearState]
    : [clearState];

export const extModules = !environment.production ? [
    StoreDevtoolsModule.instrument({
        maxAge: 25
    })
] : [];
