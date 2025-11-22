export interface IEmitter {
    on: (event: Event | Array<Event>, callback: any) => void;
    off: (event: Event | Array<Event>) => void;
    trigger: (event: Event | Array<Event>) => void;
}

interface EmitterParams {
    event: any;
    callback?: any;
    isOnce?: boolean;
    onList?: Map<any, any>;
    payload?: any;
}

class Emitter implements IEmitter {
    protected onList = new Map();
    protected onceList = new Map();

    on(event: any, callback?: any) {
        this._on({ event, callback, onList: this.onList });
    }

    once(event: any, callback?: any) {
        this._on({ event, callback, onList: this.onceList });
    }

    off(event: any) {
        this._off({ event });
    }

    trigger(event: any) {
        const callbacks = this.onList.get(event);
        if (callbacks) {
            callbacks.forEach((callback: any) => {
                callback({});
            });
        }
    }

    protected emit(event: any, payload?: any) {
        this.onceList.size > 0 && this._emit({ onList: this.onceList, event, payload, isOnce: true });
        this.onList.size > 0 && this._emit({ onList: this.onList, event, payload });
    }

    private _on({ event, callback, onList = this.onList }: EmitterParams) {
        const events: any[] = Array.isArray(event) ? event : [event];
        events.forEach((evt) => {
            if (!onList.has(evt)) onList.set(evt, []);
            onList.get(evt).push(callback);
        });
    }

    private _off({ event, onList = this.onList }: EmitterParams) {
        const events: any[] = Array.isArray(event) ? event : [event];
        events.forEach((evt) => {
            onList.delete(evt);
        });
    }

    private _emit({ event, payload, onList = this.onList, isOnce = false }: EmitterParams) {
        const callbackList = onList.get(event);
        if (callbackList) {
            callbackList.forEach((callback: any) => {
                payload ? callback(payload) : callback({});
            });
            isOnce && this._off({ event, onList });
        }
    }
}

export default Emitter;
