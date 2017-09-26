import settings from '../misc/settings';
import { IComponent } from '../misc/iComponent';
import * as Matter from 'matter-js';
import { SystemType, Colours } from '../misc/enum';

export default class Entity {

    id: string;
    isActive: boolean;
    components: { [id: string] : IComponent; };

    constructor() {

        this.components = {};
    }

    addComponent(component: IComponent) {
        this.components[SystemType[component.class]] = component;
    }

    addComponents(...components: IComponent[]) {
        components.map(this.addComponent.bind(this));
    }

    removeComponent(componentClass: string) {
        this.components[SystemType[componentClass]].destroy();
        this.components[SystemType[componentClass]] = null;
    }

    destroy() {
        console.log('destroy');
        this.isActive = false;
        Object.keys(this.components).map((component) => {
            this.removeComponent(component);
        });
        this.components = {};
    }
}