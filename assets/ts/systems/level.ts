import * as Matter from 'matter-js';
import '../misc/augment';
import settings from '../misc/settings';
import { SystemType } from '../misc/enum';
import Entity from '../misc/entity';
import EntityManager from '../managers/entity';
import ResourceManager from '../managers/resource';
import LevelManager from '../managers/level';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';
import Player from '../prefabs/player';
import Background from '../prefabs/background';

export default class LevelSystem {

    private _systemType: SystemType;
    private _entityManager: EntityManager;
    private _levelManager: LevelManager;
    private _resourceManager: ResourceManager;

    private _currentLevel: number;

    private _isLoaded: boolean;

    constructor() {

        this._systemType = SystemType.LEVEL;
        this._entityManager = EntityManager.Instance();
        this._levelManager = LevelManager.Instance();
        this._resourceManager = ResourceManager.Instance();
        this._currentLevel = 0;
        this._isLoaded = false;
    }

    getLevelData(level: number) {

        return this._resourceManager.getLevelData(level);
    }

    getEntitiesByTileData(data: ITiledLevel): Entity[] {

        let entities: Entity[] = [];

        let entityData = data.layers[0].data;

        let height = data.layers[0].height;

        let width = data.layers[0].width;

        for (let i = 0, j = entityData.length; i < j; i++) {

            if (entityData[i]) {

                let x = i % width * settings.tile.width;
                let y = Math.floor(i/width) * settings.tile.width;

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
    }

    loadLevel() {

        this._isLoaded = true;

        let data = this.getLevelData(this._currentLevel);

        let entities = this.getEntitiesByTileData(data);

        this.addEntities(entities);
    }

    init() {

    }

    update(nodes: Node[]) {

        if (!this._isLoaded) {

            this.loadLevel();
        }
    }
}