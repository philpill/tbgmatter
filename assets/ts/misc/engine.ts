import { ISettings } from './iSettings';
import RenderSystem from '../systems/render';

export default class Engine {

    _renderSystem: RenderSystem;

    constructor(settings: ISettings) {

        this._renderSystem = new RenderSystem(settings);
    }

    init() {

        this._renderSystem.init();

        this.update();
    }

    update(before = 0) {

        let now = performance.now();

        let delta = (now - before)/1000;

        delta = Math.min(delta, 0.1); // magic number to prevent massive delta when tab not active

        requestAnimationFrame(() => {

            this._renderSystem.update(delta);

            this.update(now);
        });
    }
}