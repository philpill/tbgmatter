import { ISettings } from '../misc/iSettings';
import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import { Colours } from '../misc/enum';

export default class PlayerPrefab {

    constructor(settings: ISettings, options: Matter.IBodyDefinition) {

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
            inertia: Infinity
        });

        return Matter.Body.create(options);
    }
}