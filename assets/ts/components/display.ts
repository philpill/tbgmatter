import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { SystemType, Colours } from '../misc/enum';

export default class DisplayComponent implements IComponent {

    body: Matter.Body;

    class: SystemType;

    constructor(options: Matter.IBodyDefinition) {

        this.class = SystemType.RENDER;

        this.body = Matter.Body.create(options);
    }

    destroy() {

        this.body = null;
    }
}