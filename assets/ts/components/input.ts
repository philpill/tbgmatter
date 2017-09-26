import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import settings from '../misc/settings';
import { SystemType, Colours } from '../misc/enum';
import InputManager from '../managers/input';

export default class InputComponent implements IComponent {

    class: SystemType;

    _inputManager: InputManager;

    isJump: boolean;
    isLeft: boolean;
    isUp: boolean;
    isRight: boolean;
    isDown: boolean;

    constructor() {

        this.class = SystemType.CONTROL;

        this._inputManager = InputManager.Instance();

        this._inputManager.onKeyDown(this.onKeyDown.bind(this));
        this._inputManager.onKeyUp(this.onKeyUp.bind(this));
    }

    onKeyDown(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = this.isJump || key === settings.key.space;
        this.isLeft = this.isLeft || key === settings.key.left;
        this.isUp = this.isUp || key === settings.key.up;
        this.isRight = this.isRight || key === settings.key.right;
        this.isDown = this.isDown || key === settings.key.down;
    }

    onKeyUp(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = key === settings.key.space ? false : this.isJump;
        this.isLeft = key === settings.key.left ? false : this.isLeft;
        this.isUp = key === settings.key.up ? false : this.isUp;
        this.isRight = key === settings.key.right ? false : this.isRight;
        this.isDown = key === settings.key.down ? false : this.isDown;
    }

    destroy() {

    }
}