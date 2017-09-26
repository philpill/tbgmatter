import * as Matter from 'matter-js';

import '../misc/augment';

import settings from '../misc/settings';
import { SystemType } from '../misc/enum';

import EntityManager from '../managers/entity';

export default class ControlSystem {

    private _systemType: SystemType;
    private _entityManager: EntityManager;

    constructor() {

        this._systemType = SystemType.CONTROL;
        this._entityManager = EntityManager.Instance();
    }

    init() {

    }

    update(delta: number, nodes: any[]) {


    }
}