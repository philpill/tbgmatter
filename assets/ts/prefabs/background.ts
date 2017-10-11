import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours, EntityType } from '../misc/enum';

export default class Background extends Entity {

    constructor(options: Matter.IBodyDefinition) {

        super();

        let colourManager = ColourManager.Instance();

        let display = new DisplayComponent(Matter.Common.extend(options, {
            label: EntityType.BG1.toString(),
            isStatic: true,
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 16 },
                { x: 16, y: 16 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: colourManager.getColourByEnum(Colours.rope).rgb
            },
            collisionFilter: {
                category: 0x0002
            }
        }));

        this.addComponents(display);
    }
}