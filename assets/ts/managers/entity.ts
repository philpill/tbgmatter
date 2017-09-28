import * as Matter from 'matter-js';
import { ITiledLevel } from '../misc/iTiled';

import Entity from '../misc/entity';

import Block from '../prefabs/block';
import DisplayComponent from '../components/display';

import ColourManager from '../managers/colour';
import '../misc/augment';

import { SystemType, Colours } from '../misc/enum';

export default class EntityManager {

    private static _instance: EntityManager;

    private _engine: Matter.Engine;
    private _render: Matter.Render;
    private _colourManager: ColourManager;

    private _entities: Entity[];

    private constructor() {

        this._colourManager = ColourManager.Instance();

        this._entities = [];
    }

    static Instance() {

        return this._instance || (this._instance = new this());
    }

    init() {

        this._engine = Matter.Engine.create();

        this._render = Matter.Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                background: this._colourManager.getColourByEnum(Colours.veniceblue).rgb,
                wireframes: false
            }
        });

        Matter.World.add(this._engine.world, []);

        Matter.Engine.run(this._engine);
        Matter.Render.run(this._render);
    }

    getEntities(): Entity[] {

        return this._entities;
    }

    addEntities(entities: Entity[]) {

        entities.map(this.addEntity.bind(this));
    }

    addEntity(entity: Entity) {

        this._entities.push(entity);

        let body = (entity.components[SystemType[SystemType.RENDER]] as DisplayComponent).body;

        Matter.World.addBody(this._engine.world, body);
    }

    removeAllEntities() {

        Matter.World.clear(this._engine.world, false);

        this._entities = [];
    }

    removeEntityById(id: string): Entity {

        let entity = this._entities.find((entity: Entity) => {

            return entity.id === id;
        });

        let body = (entity.components[SystemType[SystemType.RENDER]] as DisplayComponent).body;

        Matter.World.remove(this._engine.world, body);

        this._entities = this._entities.filter((entity: Entity) => {

            return entity.id !== id;
        });

        return entity;
    }

    update(delta: number) {

        Matter.Engine.update(this._engine, delta);
    }
}