import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { SystemType } from '../misc/enum';
import Entity from '../misc/entity';
import Node from '../misc/node';
import EntityManager from '../managers/entity';
import ResourceManager from '../managers/resource';
import LevelManager from '../managers/level';
import NodeManager from '../managers/node';
import { ITiledLevel } from '../misc/iTiled';

import Boundary from '../prefabs/boundary';
import Block from '../prefabs/block';
import Player from '../prefabs/player';
import Background from '../prefabs/background';

export default class LevelSystem {

    private _systemType: SystemType;
    private _entityManager: EntityManager;
    private _levelManager: LevelManager;
    private _resourceManager: ResourceManager;
    private _nodeManager: NodeManager

    private _currentLevel: number;

    private _isLoaded: boolean;

    constructor() {

        this._systemType = SystemType.LEVEL;
        this._entityManager = EntityManager.Instance();
        this._levelManager = LevelManager.Instance();
        this._resourceManager = ResourceManager.Instance();
        this._nodeManager = NodeManager.Instance();
        this._currentLevel = 0;
        this._isLoaded = false;
    }

    getLevelData(level: number) {

        return this._resourceManager.getLevelData(level);
    }

    getMapDimensionsByTileData(data: ITiledLevel) {

        let height = data.tileheight * data.height;
        let width = data.tilewidth * data.width;

        return { height: height, width: width };
    }

    createMapBoundaries(dimensions: any) {

        let height = dimensions.height;

        let width = dimensions.width;

        let entities: Entity[] = [];

        console.log(width);

        entities.push(new Boundary({
            position: {
                x: -1, y: -100
            },
            vertices: [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 10000 },
                { x: 0, y: 10000 }
            ]
        }));

        entities.push(new Boundary({
            position: {
                x: width, y: -100
            },
            vertices: [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 10000 },
                { x: 0, y: 10000 }
            ]
        }));

        entities.push(new Boundary({
            position: {
                x: -1, y: -1
            },
            vertices: [
                { x: 0, y: 0 },
                { x: 10000, y: 0 },
                { x: 10000, y: 1 },
                { x: 0, y: 1 }
            ]
        }));

        return entities;

    }

    getEntitiesByTileData(data: ITiledLevel): Entity[] {

        let entities: Entity[] = [];

        let entityData = data.layers[0].data;

        let height = data.layers[0].height;

        let width = data.layers[0].width;

        for (let i = 0, j = entityData.length; i < j; i++) {

            if (entityData[i]) {

                let x = i % width * settings.tile.width + settings.tile.width/2;
                let y = Math.floor(i/width) * settings.tile.width + settings.tile.width/2;

                entities.push(new Block({
                    position: {
                        x: x, y: y
                    }
                }));
            }
        }

        entities.push(new Background({
            position: {
                x: 10, y: 100
            }
        }));

        entities.push(new Background({
            position: {
                x: 12, y: 190
            }
        }));

        entities.push(new Player({
            position: {
                x: 9,
                y: 17
            }
        }));

        return entities;
    }

    addEntities(entities: Entity[]) {

        this._entityManager.addEntities(entities);

        this._nodeManager.createNewNodes(entities);
    }

    loadLevel() {

        this._isLoaded = true;

        this._nodeManager.removeAllNodes();

        this._entityManager.removeAllEntities();

        // clear current nodes
        // clear current entities
        // get level data
        // create entities
        // create nodes

        let data = this.getLevelData(this._currentLevel);

        let entities = this.getEntitiesByTileData(data);

        let dimensions = this.getMapDimensionsByTileData(data);

        this._entityManager.setMapDimensions(dimensions.height, dimensions.width);

        this.addEntities(entities);

        let boundaries = this.createMapBoundaries(dimensions);

        this.addEntities(boundaries);
    }

    init() {

    }

    update(nodes: Node[]) {

        if (!this._isLoaded) {

            this.loadLevel();
        }
    }
}