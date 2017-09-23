import * as Matter from 'matter-js';

import Settings from '../misc/settings';
import { SystemType } from '../misc/enum'

export default class RenderSystem {

    private _systemType: SystemType;
    private _settings: Settings;

    private _engine: Matter.Engine;
    private _render: Matter.Render;

    constructor(settings) {

        this._systemType = SystemType.RENDER;
        this._settings = settings;
    }

    init() {

        this._engine = Matter.Engine.create();

        this._render = Matter.Render.create({
            element: document.body,
            engine: this._engine
        });

        Matter.World.add(this._engine.world, []);

        Matter.Engine.run(this._engine);
        Matter.Render.run(this._render);

        this.addEntity(this.getBlock());
    }

    getBlock(): Matter.Body {

        let entity = Matter.Body.create({
            isStatic: true,
            position: {
                x: 20,
                y: 20
            },
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 16 },
                { x: 16, y: 16 },
                { x: 16, y: 0 }
            ]
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