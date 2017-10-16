import { MatterCollisionEvents } from '../../../node_modules/matter-collision-events/src/entry';

import { Matter, Plugin, Render, World, Engine, Bounds } from 'matter-js';

// import * as Matters from 'matter-js';

import { ITiledLevel } from '../misc/iTiled';
import Entity from '../misc/entity';
import Block from '../prefabs/block';
import DisplayComponent from '../components/display';
import ColourManager from '../managers/colour';
import { SystemType, Colours } from '../misc/enum';

export default class EntityManager {

    private static _instance: EntityManager;

    private _engine: Matter.Engine;
    private _render: Matter.Render;
    private _colourManager: ColourManager;

    private _entities: Entity[];

    private _focusBody: Matter.Body;

    private _mapHeight: number;
    private _mapWidth: number;

    private constructor() {

        this._colourManager = ColourManager.Instance();

        this._entities = [];
    }

    static Instance() {

        return this._instance || (this._instance = new this());
    }

    init() {

        Matter.use(MatterCollisionEvents);

        this._engine = Engine.create();

        this._render = Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                background: this._colourManager.getColourByEnum(Colours.veniceblue).rgb,
                wireframes: false,
                height: 480,
                width: 640
            },
            bounds: {
                min: { x: 0, y: 0 },
                max: { x: 640, y: 480 } // config this
            }
        });

        World.add(this._engine.world, []);

        Engine.run(this._engine);
        Render.run(this._render);
    }

    getEntities(): Entity[] {

        return this._entities;
    }

    addEntities(entities: Entity[]) {

        entities.map(this.addEntity.bind(this));
    }

    addEntity(entity: Entity) {

        this._entities.push(entity);

        let body = entity.components.display.body;

        if (entity.hasFocus) {

            this._focusBody = body;
        }

        World.addBody(this._engine.world, body);
    }

    removeAllEntities() {

        World.clear(this._engine.world, false);

        this._entities = [];

        this._focusBody = null;
    }

    setMapDimensions(height: number, width: number) {

        this._mapHeight = height;
        this._mapWidth = width;
    }

    removeEntityById(id: string): Entity {

        let entity = this._entities.find((entity: Entity) => {

            return entity.id === id;
        });

        let body = entity.components.display.body;

        World.remove(this._engine.world, body);

        this._entities = this._entities.filter((entity: Entity) => {

            return entity.id !== id;
        });

        return entity;
    }

    private _getFocusY(bodyY: number): number {

        let focusY = bodyY;

        let mapHeight = this._mapHeight;

        let screenHeight = this._render.canvas.height;

        focusY = bodyY < screenHeight/2 ? 0 : bodyY - screenHeight/2;

        focusY = bodyY + screenHeight/2 > mapHeight ? mapHeight - screenHeight : focusY;

        return focusY;
    }

    private _getFocusX(bodyX: number): number {

        let focusX = bodyX;

        let mapWidth = this._mapWidth;

        let screenWidth = this._render.canvas.width;

        focusX = bodyX < screenWidth/2 ? 0 : bodyX - screenWidth/2;

        focusX = bodyX + screenWidth/2 > mapWidth ? mapWidth - screenWidth : focusX;

        // console.log('-----------------------');

        // console.log(bodyX);

        // console.log(mapWidth); // 720
        // console.log(screenWidth); // 640

        // console.log(focusX); // 80

        return focusX;
    }

    update(delta: number) {

        let focusX = 0;

        let focusY = 0;

        if (this._focusBody) {

            focusX = this._getFocusX(this._focusBody.position.x);

            focusY = this._getFocusY(this._focusBody.position.y);
        }

        Bounds.shift(this._render.bounds, { x: focusX, y: focusY });

        Engine.update(this._engine, delta);
    }
}