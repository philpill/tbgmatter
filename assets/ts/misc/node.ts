import Display from '../components/display';
import Input from '../components/input';
import Trigger from '../components/trigger';

import settings from '../misc/settings';
import { SystemType } from '../misc/enum';

export class NodeComponents {

    display?: Display;
    input?: Input;
    trigger?: Trigger;
}

export default class Node {

    entityId: string;
    type: SystemType;
    components: NodeComponents;

    constructor(entityId: string, type: SystemType, components: NodeComponents) {

        this.entityId = entityId;
        this.type = type;
        this.components = components;
    }

    destroy() {

        this.components = null;
        this.entityId = null;
        this.type = null;
    }
}