import * as matter from 'matter-js';

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
        this._levelManager = new LevelManager(this._settings);
        this._entityManager = new EntityManager(this._settings);
    }

    async init() {

        await this._resourceManager.load();
        let data = this._resourceManager.getLevelData(0);
        let entities = this._levelManager.loadLevel(data);
        this._entityManager.addEntities(entities);
        this._engine.init();
    }
}

let tbgmatter = new Main();

tbgmatter.init();