import settings from '../misc/settings';

export default class InputManager {

    private static _instance: InputManager;

    onKeyDownCallback: Function;
    onKeyUpCallback: Function;

    private constructor() {

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

        this.onKeyDownCallback = null;
        this.onKeyUpCallback = null;
    }

    onKeyDownHandler(e: KeyboardEvent) {
        if (this.onKeyDownCallback) {
            return this.onKeyDownCallback(e);
        }
    }

    onKeyUpHandler(e: KeyboardEvent) {
        if (this.onKeyUpCallback) {
            return this.onKeyUpCallback(e);
        }
    }

    onKeyUp(callback: Function) {
        this.onKeyUpCallback = callback;
    }

    onKeyDown(callback: Function) {
        this.onKeyDownCallback = callback;
    }
}