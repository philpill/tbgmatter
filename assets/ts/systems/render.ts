import * as Matter from 'matter-js';
import Palette from '../misc/palette';
import '../misc/augment';

import { ISettings } from '../misc/iSettings';
import { SystemType } from '../misc/enum';
import { Colours } from '../misc/enum';

import Block from '../prefabs/block';
import Player from '../prefabs/player';

import EntityManager from '../managers/entity';

export default class RenderSystem {

    private _systemType: SystemType;
    private _settings: ISettings;

    private _engine: Matter.Engine;
    private _render: Matter.Render;

    private _palette: Palette;

    private _entityManager: EntityManager;

    constructor(settings: ISettings) {

        this._systemType = SystemType.RENDER;
        this._settings = settings;

        this._entityManager = new EntityManager(this._settings);

        this._palette = new Palette();
    }

    init() {

        this._entityManager.init();

        this._entityManager.addEntity(this.getBlock());
        this._entityManager.addEntity(this.getPlayer());
    }

    getPlayer(): any {

        let entity = new Player(this._settings, {
            position: {
                x: 9,
                y: 17
            }
        });

        return entity;
    }

    getBlock(): any {

        let entity = new Block(this._settings, {
            position: {
                x: 8,
                y: 200
            }
        });


        return entity;
    }

    update(delta: number) {

        this._entityManager.update(delta);
    }
}