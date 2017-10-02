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

            if (input.isRight) {
                x = 2.5;
            }

            if (input.isLeft) {
                x = -2.5;
            }

            if ((input.isJump || input.isUp) && y === 0) {
                y = -5;
            }

            Matter.Body.setVelocity(display.body, { x: x, y: y });

        });
    }
}