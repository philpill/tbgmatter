import { ISettings } from '../misc/iSettings';
import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import { Colours } from '../misc/enum';

export default function(settings: ISettings, options: Matter.IBodyDefinition): Matter.Body {

    let palette = new Palette();

    Matter.Common.extend(options, {
        isStatic: true,
        vertices: [
            { x: 0, y: 0 },
            { x: 0, y: 16 },
            { x: 16, y: 16 },
            { x: 16, y: 0 }
        ],
        render: {
            fillStyle: palette.getColourByEnum(Colours.rope).rgb
        },
        collisionFilter: {
            category: 0x0002
        }
    });

    return Matter.Body.create(options);
}