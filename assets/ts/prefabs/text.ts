import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import ResourceManager from '../managers/resource';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours, EntityType } from '../misc/enum';

export default class TextEntity extends Entity {

    constructor(bodyOpts: Matter.IBodyDefinition, options) {

        super();

        let colourManager = ColourManager.Instance();
        let resourceManager = ResourceManager.Instance();

        let tile = 16;
        let index = options.spriteIndex;

        // console.log(`${index} { ${ index%8 }, ${ Math.floor(index/8) } }`);

        let x = (index%8) * tile;
        let y = Math.floor(index/8) * tile;

        let defaults: Matter.IBodyDefinition = {
            label: EntityType.TEXT1.toString(),
            isStatic: true,
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 16 },
                { x: 16, y: 16 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: colourManager.getColourByEnum(Colours.christi).rgb,
                sprite: {
                    texture: resourceManager.getImagePath('img-text-sprite'),
                    sourceHeight: 16,
                    sourceWidth: 16,
                    xSourcePos: x,
                    ySourcePos: y
                }
            },
            collisionFilter: {
                category: 0x0002
            }
        };

        let opts: Matter.IBodyDefinition = Object.assign(bodyOpts, defaults);

        let display = new DisplayComponent(opts);

        this.addComponents(display);
    }
}