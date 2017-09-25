import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import '../misc/augment';

import { ISettings } from '../misc/iSettings';
import { SystemType } from '../misc/enum';
import { Colours } from '../misc/enum';

import Block from '../prefabs/block';
import Player from '../prefabs/player';

export default class RenderSystem {

    private _systemType: SystemType;
    private _settings: ISettings;

    private _engine: Matter.Engine;
    private _render: Matter.Render;

    private _palette: Palette;

    constructor(settings: ISettings) {

        this._systemType = SystemType.RENDER;
        this._settings = settings;

        this._palette = new Palette();
    }

    init() {

        this._engine = Matter.Engine.create();

        this._render = Matter.Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                background: this._palette.getColourByEnum(Colours.veniceblue).rgb,
                wireframes: false
            }
        });

        Matter.World.add(this._engine.world, []);

        Matter.Engine.run(this._engine);
        Matter.Render.run(this._render);

        this.addEntity(this.getBlock());
        this.addEntity(this.getPlayer());
    }

    getPlayer(): any {

        let entity = new Player(this._settings, {
            position: {
                x: 9,
                y: 17
            }
        });

        return entity;
    }

    getBlock(): any {

        let entity = new Block(this._settings, {
            position: {
                x: 8,
                y: 200
            }
        });


        return entity;
    }

    getEntities(): Matter.Body[] {

        return Matter.World.allBodies(this._engine.world);
    }

    addEntity(entity: Matter.Body) {

        Matter.World.addBody(this._engine.world, entity);
    }

    removeEntity(entity: Matter.Body) {

        Matter.World.remove(this._engine.world, entity);
    }

    update(delta: number) {

        Matter.Engine.update(this._engine, delta);

        // console.log(delta);
    }
}