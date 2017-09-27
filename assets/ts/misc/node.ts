import settings from '../misc/settings';
import { SystemType } from '../misc/enum';

export default class node {

    type: SystemType;

    constructor(type: SystemType) {

        this.type = type;
    }

    destroy() {

        this.type = null;
    }
}