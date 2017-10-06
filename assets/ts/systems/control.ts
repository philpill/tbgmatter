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

            let x = display.body.velocity.x;
            let y = display.body.velocity.y;

            let velocityX = 2.5;
            let airVelocityX = 1.2;

            if (input.isRight) {

                x = y === 0 ? velocityX : airVelocityX;
            }

            if (input.isLeft) {

                x = y === 0 ? -velocityX : -airVelocityX;
            }

            if ((input.isJump || input.isUp) && y === 0) {

                this._audioManager.play('audio-hup');
                y = -5;
            }

            let friction = y === 0 ? 0.1 : 0;

            Matter.Body.set(display.body, {
                friction: friction,
                velocity: { x: x, y: y }
            });

        });
    }
}