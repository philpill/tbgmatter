import * as Matter from 'matter-js';
import { ISettings } from '../misc/iSettings';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';

let instance = null;

export default class LevelManager {

    private _settings: ISettings;
    private _currentLevel: number;

    constructor(settings: ISettings) {

        if (!instance) {
            instance = this;
        }

        this._settings = settings;

        return instance;
    }

    loadLevel(data: ITiledLevel): any[] {

        // generate prefabs

        let entities = [];

        let block = new Block(this._settings, {
            position: {
                x: 50, y: 50
            }
        });

        entities.push(block);

        return entities;
    }
}