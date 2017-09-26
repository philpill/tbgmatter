import * as Matter from 'matter-js';

import { ISettings } from './misc/iSettings';
import Settings from './misc/settings';
import Engine from './misc/engine';
import ResourceManager from './managers/resource';
import LevelManager from './managers/level';
import EntityManager from './managers/entity';

export default class Main {

    private _engine: Engine;
    private _settings: ISettings;

    private _resourceManager: ResourceManager;
    private _levelManager: LevelManager;
    private _entityManager: EntityManager;

    constructor() {

        this._settings = Settings;
        this._engine = new Engine(this._settings);

        this._resourceManager = new ResourceManager(this._settings);
        this._levelManager = LevelManager.Instance(this._settings);
        this._entityManager = EntityManager.Instance(this._settings);
    }

    async init() {

        await this._resourceManager.load();
        let data = this._resourceManager.getLevelData(0);
        this._engine.init();

        this._levelManager.loadLevel(data);
    }
}

let tbgmatter = new Main();

tbgmatter.init();