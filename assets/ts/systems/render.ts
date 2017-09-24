import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import '../misc/augment';

import Settings from '../misc/settings';
import { SystemType } from '../misc/enum';



export default class RenderSystem {

    private _systemType: SystemType;
    private _settings: Settings;

    private _engine: Matter.Engine;
    private _render: Matter.Render;

    private _palette: Palette;

    constructor(settings) {

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
                background: this._palette.getColourById('veniceblue').rgb,
                wireframes: false
            }
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
                x: 9,
                y: 17
            },
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 32 },
                { x: 16, y: 32 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: this._palette.getColourById('mandy').rgb,
                lineWidth: 0
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