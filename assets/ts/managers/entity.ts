import * as Matter from 'matter-js';
import { ISettings } from '../misc/iSettings';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';

import Palette from '../misc/palette';
import '../misc/augment';

import { SystemType } from '../misc/enum';
import { Colours } from '../misc/enum';

let instance = null;

export default class EntityManager {

    private _settings: ISettings;
    private _engine: Matter.Engine;
    private _render: Matter.Render;
    private _palette: Palette;


    constructor(settings: ISettings) {

        if (!instance) {
            instance = this;
        }

        this._palette = new Palette();
        this._settings = settings;

        return instance;
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
    }

    getEntities(): Matter.Body[] {

        return Matter.World.allBodies(this._engine.world);
    }

    addEntities(entities: Matter.Body[]) {

        Matter.World.add(this._engine.world, entities);
    }

    addEntity(entity: Matter.Body) {

        Matter.World.addBody(this._engine.world, entity);
    }

    removeEntity(entity: Matter.Body) {

        Matter.World.remove(this._engine.world, entity);
    }

    update(delta: number) {

        Matter.Engine.update(this._engine, delta);
    }
}