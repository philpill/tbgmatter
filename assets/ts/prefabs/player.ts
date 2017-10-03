import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours } from '../misc/enum';

export default class Player extends Entity {

    constructor(options: Matter.IBodyDefinition) {

        super();

        this.hasFocus = true;

        let colourManager = ColourManager.Instance();

        let display = new DisplayComponent(Matter.Common.extend(options, {
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 32 },
                { x: 16, y: 32 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: colourManager.getColourByEnum(Colours.mandy).rgb
            },
            inertia: Infinity,
            collisionFilter: {
                mask: 0x0001
            }
        }));

        let input = new InputComponent();

        this.addComponents(display, input);
    }
}


