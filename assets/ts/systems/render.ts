import * as Matter from 'matter-js';
import settings from '../misc/settings';
import { SystemType } from '../misc/enum';
import EntityManager from '../managers/entity';

export default class RenderSystem {

    private _systemType: SystemType;

    private _entityManager: EntityManager;

    constructor() {

        this._systemType = SystemType.RENDER;

        this._entityManager = EntityManager.Instance();
    }

    init() {

        this._entityManager.init();
    }

    update(delta: number) {

        this._entityManager.update(delta);
    }
}