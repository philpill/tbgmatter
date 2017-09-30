import Node from '../misc/node';
import { NodeComponents } from '../misc/node';
import settings from '../misc/settings';
import Entity from '../misc/entity';
import { IComponent } from '../misc/iComponent';
import { SystemType } from '../misc/enum';

export default class NodeManager {

    private static _instance: NodeManager;

    private typedNodes: { [type: string] : Node[]; };

    private constructor() {

        this.init();
    }

    static Instance() {

        return this._instance || (this._instance = new this());
    }

    init() {

        this.typedNodes = {};

        const objValues = Object.keys(SystemType).map(k => SystemType[k]);

        const values = objValues.filter(v => typeof v === 'number') as number[];

        for (var val in values) {

            this.typedNodes[val] = [];
        }
    }

    addNodes(nodes: Node[]) {

        nodes.map(this.addNode.bind(this));
    }

    addNode(node: Node) {

        this.typedNodes[node.type].push(node);
    }

    getNodesByEntity(entity: Entity): Node[] {

        let nodes = [];

        nodes.push(...this.getNodesByComponents(entity.id, entity.components));

        return nodes;
    }

    getNodesByEntities(entities: Entity[]): Node[] {

        let nodes = [];

        entities.map((entity: Entity) => {

            nodes.push(...this.getNodesByEntity(entity));
        });

        return nodes;
    }

    createNewNodes(entities: Entity[]) {

        this.addNodes(this.getNodesByEntities(entities));
    }

    getNodesByComponents(entityId: string, components: NodeComponents): Node[] {

        let nodes = [];

        if (components[SystemType.CONTROL] && components[SystemType.RENDER]) {

            nodes.push(new Node(entityId, SystemType.CONTROL, components));
        }

        return nodes;
    }

    getNodesByType(type: SystemType) {

        return this.typedNodes[type];
    }

    removeAllNodes() {


    }

    // addClassType(systemType: SystemType): void {
    //     this._nodes[systemType] = [];
    // }

    // addNode(node: Node): void {
    //     this._nodes[node.type].push(node);
    // }

    // addNewNode(entityId: string, systemType: SystemType, components: NodeComponents): Node {
    //     let node = new Node(entityId, systemType, components);
    //     this.addNode(node);
    //     return node;
    // }

    // removeNodesByClassType(systemType: SystemType): void {
    //     this._nodes[systemType] = [];
    // }

    // getAllNodes(): Node[] {
    //     let vals: Node[][] = Object.values(this._nodes);
    //     return [].concat.apply([], vals);
    // }

    // // slow
    // getNodesByEntityId(entityId: string) {
    //     return this.getAllNodes().filter((node: Node) => {
    //         return node.entityId === entityId;
    //     });
    // }

    // getInactiveNodes(): Node[] {
    //     let nodes: Node[] = this.getAllNodes();
    //     return nodes.filter((node: Node) => {
    //         return !node.isActive;
    //     });
    // }

    // getActiveNodesByClassType(systemType: SystemType): Node[] {
    //     return this._nodes[systemType].filter((node) => {
    //         return node.isActive;
    //     });
    // }

    // discardInactiveNodes(): void {
    //     Object.keys(this._nodes).map((systemType: string) => {
    //         this._nodes[systemType] = this._nodes[systemType].filter((node: Node) => {
    //             return node.isActive;
    //         });
    //     });
    // }

    // destroyNodesByClassType(systemType: SystemType): void {
    //     this._nodes[systemType].map((node: Node) => {
    //         node.destroy();
    //     });
    // }

    // destroyNodesByEntityId(entityId: string): Node[] {
    //     return this.getNodesByEntityId(entityId).map((node: Node) => {
    //         this.destroySprite(node);
    //         node.destroy();
    //         return node;
    //     });
    // }

    // destroyNodesByEntityIds(ids: string[]): void {
    //     ids.map(this.destroyNodesByEntityId, this);
    // }

    // destroySprite(node: Node): void {
    //     if (node.display && node.display.sprite) {
    //         node.display.sprite.destroy();
    //     }
    // }

    // generateNodes(entityId: string, components: NodeComponents): void {

    //     if (components.display && components.position) {
    //         this.addNewNode(entityId, ClassType.RENDER, components);
    //     }

    //     if (components.animation && components.display && components.velocity) {
    //         this.addNewNode(entityId, ClassType.ANIMATION, components);
    //     }

    //     if (components.velocity && components.position && components.collision) {
    //         this.addNewNode(entityId, ClassType.MOVE, components);
    //     }

    //     if (components.velocity && components.input) {
    //         this.addNewNode(entityId, ClassType.CONTROL, components);
    //     }

    //     if (components.collision && components.display) {
    //         this.addNewNode(entityId, ClassType.COLLISION, components);
    //     }

    //     if (components.trigger) {
    //         this.addNewNode(entityId, ClassType.LEVEL, components);
    //     }
    // }

    // getNodeCount(): Number {
    //     return this.getAllNodes().length;
    // }
}