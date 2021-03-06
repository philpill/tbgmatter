import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import settings from '../misc/settings';
import { SystemType, Colours } from '../misc/enum';
import InputManager from '../managers/input';

export class IInputHandlers {
    onUp?: Function;
    onDown?: Function;
    onLeft?: Function;
    onRight?: Function;
    onActionPrimary?: Function;

    onReset?: Function;
}

export default class InputComponent implements IComponent {

    type: SystemType;

    _inputManager: InputManager;

    isLeft: boolean;
    isUp: boolean;
    isRight: boolean;
    isDown: boolean;
    isActionPrimary: boolean;

    onUp: Function;
    onLeft: Function;
    onRight: Function;
    onActionPrimary: Function;
    onReset: Function;

    constructor(handlers: IInputHandlers) {


        this.type = SystemType.CONTROL;

        this._inputManager = InputManager.Instance();

        this._inputManager.onKeyDown(this.onKeyDown.bind(this));
        this._inputManager.onKeyUp(this.onKeyUp.bind(this));

        this.onUp = handlers.onUp;
        this.onRight = handlers.onRight;
        this.onLeft = handlers.onLeft;
        this.onActionPrimary = handlers.onActionPrimary;

        this.onReset = handlers.onReset;
    }

    onKeyDown(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isActionPrimary = this.isActionPrimary || key === settings.key.space;
        this.isLeft = this.isLeft || key === settings.key.left;
        this.isUp = this.isUp || key === settings.key.up;
        this.isRight = this.isRight || key === settings.key.right;
        this.isDown = this.isDown || key === settings.key.down;

    }

    onKeyUp(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isActionPrimary = key === settings.key.space ? false : this.isActionPrimary;
        this.isLeft = key === settings.key.left ? false : this.isLeft;
        this.isUp = key === settings.key.up ? false : this.isUp;
        this.isRight = key === settings.key.right ? false : this.isRight;
        this.isDown = key === settings.key.down ? false : this.isDown;
    }

    destroy() {

    }
}