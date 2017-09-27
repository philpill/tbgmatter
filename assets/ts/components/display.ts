import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { SystemType, Colours } from '../misc/enum';

export default class DisplayComponent implements IComponent {

    body: Matter.Body;

    type: SystemType;

    constructor(options: Matter.IBodyDefinition) {

        this.type = SystemType.RENDER;

        this.body = Matter.Body.create(options);
    }

    destroy() {

        this.body = null;
    }
}