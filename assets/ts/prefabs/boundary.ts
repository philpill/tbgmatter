import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours } from '../misc/enum';

export default class Boundary extends Entity {

    constructor(options: Matter.IBodyDefinition) {

        super();

        let display = new DisplayComponent(Matter.Common.extend(options, {
            isStatic: true,
            vertices: options.vertices,
            render: {
                fillStyle: 'transparent'
            }
        }));

        this.addComponents(display);
    }
}