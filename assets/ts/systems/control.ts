import * as Matter from 'matter-js';
import Node from '../misc/node';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import settings from '../misc/settings';
import { SystemType } from '../misc/enum';

import EntityManager from '../managers/entity';
import AudioManager from '../managers/audio';

export default class ControlSystem {

    private _systemType: SystemType;
    private _entityManager: EntityManager;
    private _audioManager: AudioManager;

    constructor() {

        this._systemType = SystemType.CONTROL;
        this._entityManager = EntityManager.Instance();
        this._audioManager = AudioManager.Instance();
    }

    init() {

    }

    update(nodes: Node[]) {

        nodes.map((node: Node) => {

            let display = node.components.display;
            let input = node.components.input;

            if (input.isRight && input.onRight) {

                input.onRight();
            }

            if (input.isLeft && input.onLeft) {

                input.onLeft();
            }

            if (input.isUp && input.onUp) {

                input.onUp();
            }

            if (!input.isLeft && !input.isRight && !input.isUp && input.onReset) {

                input.onReset();
            }
        });
    }
}