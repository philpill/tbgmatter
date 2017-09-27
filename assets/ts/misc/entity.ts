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
        this.components[SystemType[component.type]] = component;
    }

    addComponents(...components: IComponent[]) {
        components.map(this.addComponent.bind(this));
    }

    removeComponent(componentType: string) {
        this.components[SystemType[componentType]].destroy();
        this.components[SystemType[componentType]] = null;
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