import * as matter from 'matter-js';

import Settings from './misc/settings';
import Engine from './misc/engine';
import ResourceManager from './managers/resource';

// import AnimationSystem from './systems/animation';
// import CollisionSystem from './systems/collision';
// import ControlSystem from './systems/control';
// import LevelSystem from './systems/level';
// import MoveSystem from './systems/move';
// import RenderSystem from './systems/render';
// import SoundSystem from './systems/sound';

export default class Main {

    private _engine: Engine;
    private _settings: Settings;

    private _resourceManager: ResourceManager;

    constructor() {

        this._settings = new Settings();
        this._engine = new Engine(this._settings);

        this._resourceManager = new ResourceManager(this._settings);

        this._engine.init();
    }
}

let tbgmatter = new Main();