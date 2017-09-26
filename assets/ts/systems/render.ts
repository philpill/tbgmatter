import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import '../misc/augment';

import { ISettings } from '../misc/iSettings';
import { SystemType } from '../misc/enum';


import EntityManager from '../managers/entity';

export default class RenderSystem {

    private _systemType: SystemType;
    private _settings: ISettings;

    private _entityManager: EntityManager;

    constructor(settings: ISettings) {

        this._systemType = SystemType.RENDER;
        this._settings = settings;

        this._entityManager = EntityManager.Instance(this._settings);
    }

    init() {

        this._entityManager.init();
    }

    update(delta: number) {

        this._entityManager.update(delta);
    }
}