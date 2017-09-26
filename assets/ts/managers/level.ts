import * as Matter from 'matter-js';
import { ISettings } from '../misc/iSettings';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';
import Player from '../prefabs/player';
import Background from '../prefabs/background';

import EntityManager from '../managers/entity';

let instance = null;

export default class LevelManager {

    private static _instance: LevelManager;

    private _settings: ISettings;
    private _currentLevel: number;
    private _entityManager: EntityManager;

    private constructor(settings: ISettings) {

        this._settings = settings;
        this._entityManager = EntityManager.Instance(this._settings);
    }

    static Instance(settings: ISettings)
    {
        return this._instance || (this._instance = new this(settings));
    }

    getPlayer(): Matter.Body {

        let entity = Player(this._settings, {
            position: {
                x: 9,
                y: 17
            }
        });

        return entity;
    }

    loadLevel(data: ITiledLevel) {

        console.log('loadLevel');

        console.log(data);


        this._entityManager.addEntity(Background(this._settings, {
            position: {
                x: 10, y: 100
            }
        }));

        this._entityManager.addEntity(Background(this._settings, {
            position: {
                x: 12, y: 190
            }
        }));

        this._entityManager.addEntity(this.getPlayer());


        this._entityManager.addEntity(Block(this._settings, {
            position: {
                x: 50, y: 50
            }
        }));

        this._entityManager.addEntity(Block(this._settings, {
            position: {
                x: 8, y: 200
            }
        }));
    }
}