import * as matter from 'matter-js';

import Settings from './misc/settings';
import Engine from './misc/engine';
import ResourceManager from './managers/resource';
import LevelManager from './managers/level';

export default class Main {

    private _engine: Engine;
    private _settings: Settings;

    private _resourceManager: ResourceManager;
    private _levelManager: LevelManager;

    constructor() {

        this._settings = new Settings();
        this._engine = new Engine(this._settings);

        this._resourceManager = new ResourceManager(this._settings);
        this._levelManager = new LevelManager(this._settings);
    }

    async init() {

        await this._resourceManager.load();
        let data = this._resourceManager.getLevelData(0);
        this._levelManager.loadLevel(data);
        this._engine.init();
    }
}

let tbgmatter = new Main();

tbgmatter.init();