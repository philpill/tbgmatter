import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { SystemType, Colours } from '../misc/enum';

export default class TriggerComponent implements IComponent {

    type: SystemType;

    nextLevel: boolean;

    constructor() {

        this.type = SystemType.TRIGGER;
        this.nextLevel = false;
    }

    destroy() {

    }
}