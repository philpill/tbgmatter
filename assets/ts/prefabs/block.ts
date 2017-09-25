import { ISettings } from '../misc/iSettings';
import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import { Colours } from '../misc/enum';

export default class BlockPrefab {

    constructor(settings: ISettings, options: Matter.IBodyDefinition) {

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
                fillStyle: palette.getColourByEnum(Colours.heather).rgb
            }});

        return Matter.Body.create(options);
    }
}