import * as Matter from 'matter-js';

import settings from './misc/settings';
import Engine from './misc/engine';
import ResourceManager from './managers/resource';
import LevelManager from './managers/level';
import EntityManager from './managers/entity';
import InputManager from './managers/input';

export default class Main {

    private _engine: Engine;

    private _resourceManager: ResourceManager;
    private _levelManager: LevelManager;
    private _entityManager: EntityManager;
    private _inputManager: InputManager;

    constructor() {

        this._engine = new Engine();

        this._resourceManager = ResourceManager.Instance();
        this._levelManager = LevelManager.Instance();
        this._entityManager = EntityManager.Instance();
        this._inputManager = InputManager.Instance();
    }

    async init() {

        await this._resourceManager.load();

        this._engine.init();
    }
}

let tbgmatter = new Main();

tbgmatter.init();