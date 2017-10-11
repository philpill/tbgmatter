import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours } from '../misc/enum';

export default class Trigger extends Entity {

    constructor(options: Matter.IBodyDefinition) {

        super();

        let colourManager = ColourManager.Instance();

        let display = new DisplayComponent(Matter.Common.extend(options, {
            isStatic: true,
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 16 },
                { x: 16, y: 16 },
                { x: 16, y: 0 }
            ],
            render: {
                //fillStyle: 'transparent'
                fillStyle: colourManager.getColourByEnum(Colours.stinger).rgb
            }
        }));

        this.addComponents(display);
    }
}