import Display from '../components/display';
import Input from '../components/input';

import settings from '../misc/settings';
import { SystemType } from '../misc/enum';

export class NodeComponents {

    display?: Display;
    input?: Input;
}

export default class Node {

    entityId: string;
    type: SystemType;

    constructor(entityId: string, type: SystemType, components: NodeComponents) {

        this.entityId = entityId;
        this.type = type;
    }

    destroy() {

        this.entityId = null;
        this.type = null;
    }
}