import Node from '../misc/node';
import { NodeComponents } from '../misc/node';
import settings from '../misc/settings';
import Entity from '../misc/entity';
import { SystemType } from '../misc/enum';

export default class NodeManager {

    private static _instance: NodeManager;

    private typedNodes: { [type: string] : Node[]; };

    private constructor() {

        this.typedNodes = {
            input: [],
            display: []
        };
    }

    static Instance() {

        return this._instance || (this._instance = new this());
    }

    createNewNodes(entities: Entity[]) {

        entities.map((entity: Entity) => {

            if (entity.components.input && entity.components.display) {

                this.typedNodes.input.push(new Node(entity.id, SystemType.CONTROL, entity.components));
            }

            if (entity.components.display) {

                this.typedNodes.display.push(new Node(entity.id, SystemType.RENDER, entity.components));
            }
        });
    }

    getNodesByType(type: SystemType): Node[] {

        let nodes = [];

        switch(type) {
            case SystemType.CONTROL:
                nodes = this.typedNodes.input;
                break;
            case SystemType.RENDER:
                nodes = this.typedNodes.display;
                break;
        }

        return nodes;
    }

    removeAllNodes() {

        this.typedNodes.input = [];
        this.typedNodes.display = [];
    }
}