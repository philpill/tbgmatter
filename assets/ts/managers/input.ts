import settings from '../misc/settings';

export default class InputManager {

    private static _instance: InputManager;

    onKeyDownHandlers: Function[];
    onKeyUpHandlers: Function[];

    private constructor() {

        this.onKeyDownHandlers = [];
        this.onKeyUpHandlers = [];

        window.addEventListener('keydown', this.onKeyDownHandler.bind(this), false);
        window.addEventListener('keyup', this.onKeyUpHandler.bind(this), false);
    }

    static Instance()
    {
        return this._instance || (this._instance = new this());
    }

    destroy() {

        window.removeEventListener('keydown', this.onKeyDownHandler);
        window.removeEventListener('keyup', this.onKeyUpHandler);

        this.onKeyDownHandlers = null;
        this.onKeyUpHandlers = null;
    }

    removeAllHandlers() {
        this.onKeyDownHandlers = [];
        this.onKeyUpHandlers = [];
    }

    onKeyDownHandler(e: KeyboardEvent) {
        this.onKeyDownHandlers.map((handler: Function) => {
            handler(e);
        });
    }

    onKeyUpHandler(e: KeyboardEvent) {
        this.onKeyUpHandlers.map((handler: Function) => {
            handler(e);
        });
    }

    onKeyUp(callback: Function) {
        this.onKeyUpHandlers.push(callback);
    }

    onKeyDown(callback: Function) {
        this.onKeyDownHandlers.push(callback);
    }
}