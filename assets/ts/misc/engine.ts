import Settings from './settings';
import RenderSystem from '../systems/render';

export default class Engine {

    _renderSystem: RenderSystem;

    constructor(settings: Settings) {

        this._renderSystem = new RenderSystem(settings);
    }

    init() {

        this._renderSystem.init();

        this.update();
    }

    update(before = 0) {

        let now = performance.now();

        let delta = (now - before)/1000;

        requestAnimationFrame(() => {

            this._renderSystem.update(delta);

            this.update(now);
        });
    }
}