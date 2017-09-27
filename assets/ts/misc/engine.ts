import settings from '../misc/settings';
import RenderSystem from '../systems/render';
import ControlSystem from '../systems/control';
import LevelSystem from '../systems/level';

import Node from '../misc/node';

export default class Engine {

    _renderSystem: RenderSystem;
    _controlSystem: ControlSystem;
    _levelSystem: LevelSystem;

    constructor() {

        this._renderSystem = new RenderSystem();
        this._controlSystem = new ControlSystem();
        this._levelSystem = new LevelSystem();
    }

    init() {

        this._renderSystem.init();
        this._controlSystem.init();
        this._levelSystem.init();

        this.update();
    }

    update(before = 0) {

        let now = performance.now();

        let delta = (now - before)/1000;

        delta = Math.min(delta, 0.1); // magic number to prevent massive delta when tab not active

        requestAnimationFrame(() => {

            this._renderSystem.update(delta);

            this._controlSystem.update(delta, []);

            this._levelSystem.update([]);

            this.update(now);
        });
    }
}