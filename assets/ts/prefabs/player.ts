import { ISettings } from '../misc/iSettings';
import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import { Colours } from '../misc/enum';

export default function(settings: ISettings, options: Matter.IBodyDefinition): Matter.Body {

    let palette = new Palette();

    Matter.Common.extend(options, {
        vertices: [
            { x: 0, y: 0 },
            { x: 0, y: 32 },
            { x: 16, y: 32 },
            { x: 16, y: 0 }
        ],
        render: {
            fillStyle: palette.getColourByEnum(Colours.mandy).rgb
        },
        inertia: Infinity,
        collisionFilter: {
            mask: 0x0001
        },
    });

    return Matter.Body.create(options);
}