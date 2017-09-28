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
}