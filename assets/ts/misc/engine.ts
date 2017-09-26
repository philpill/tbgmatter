import settings from '../misc/settings';
import RenderSystem from '../systems/render';
import ControlSystem from '../systems/control';

export default class Engine {

    _renderSystem: RenderSystem;
    _controlSystem: ControlSystem;

    constructor() {

        this._renderSystem = new RenderSystem();
        this._controlSystem = new ControlSystem();
    }

    init() {

        this._renderSystem.init();
        this._controlSystem.init();

        this.update();
    }

    update(before = 0) {

        let now = performance.now();

        let delta = (now - before)/1000;

        delta = Math.min(delta, 0.1); // magic number to prevent massive delta when tab not active

        requestAnimationFrame(() => {

            this._renderSystem.update(delta);

            this._controlSystem.update(delta, []);

            this.update(now);
        });
    }
}