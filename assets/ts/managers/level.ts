import Settings from '../misc/settings';
import { ITiledLevel } from '../misc/iTiled';

export default class LevelManager {

    private _settings: Settings;
    private _currentLevel: number;

    constructor(settings: Settings) {

        this._settings = settings;
    }

    loadLevel(data: ITiledLevel) {

    }
}