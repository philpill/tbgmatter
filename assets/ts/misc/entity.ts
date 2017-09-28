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
        this.id = this.getId();
    }

    getId(): string {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
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