import * as Matter from 'matter-js';
import Node from '../misc/node';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
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

    update(delta: number, nodes: Node[]) {

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
                y = -5;
            }

            Matter.Body.set(display.body, { friction: y === 0 ? 0.1 : 0 });

            Matter.Body.setVelocity(display.body, { x: x, y: y });

        });
    }
}