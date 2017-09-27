import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';
import Player from '../prefabs/player';
import Background from '../prefabs/background';

import EntityManager from '../managers/entity';

let instance = null;

export default class LevelManager {

    private static _instance: LevelManager;

    private _currentLevel: number;
    private _entityManager: EntityManager;

    private constructor() {

        this._entityManager = EntityManager.Instance();
    }

    static Instance()
    {
        return this._instance || (this._instance = new this());
    }

    // loadLevel(data: ITiledLevel) {

    //     console.log('loadLevel');

    //     console.log(data);

    //     let entityData = data.layers[0].data;

    //     let height = data.layers[0].height;

    //     let width = data.layers[0].width;

    //     for (let i = 0, j = entityData.length; i < j; i++) {

    //         if (entityData[i]) {

    //             let x = i % width * settings.tile.width;
    //             let y = Math.floor(i/width) * settings.tile.width;

    //             this._entityManager.addEntity(new Block({
    //                 position: {
    //                     x: x, y: y
    //                 }
    //             }));
    //         }
    //     }

    //     this._entityManager.addEntity(new Background({
    //         position: {
    //             x: 10, y: 100
    //         }
    //     }));

    //     this._entityManager.addEntity(new Background({
    //         position: {
    //             x: 12, y: 190
    //         }
    //     }));

    //     this._entityManager.addEntity(new Player({
    //         position: {
    //             x: 9,
    //             y: 17
    //         }
    //     }));
    // }
}