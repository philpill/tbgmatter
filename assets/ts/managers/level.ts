import { ISettings } from '../misc/iSettings';
import { ITiledLevel } from '../misc/iTiled';

import Block from '../prefabs/block';

export default class LevelManager {

    private _settings: ISettings;
    private _currentLevel: number;

    constructor(settings: ISettings) {

        this._settings = settings;
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