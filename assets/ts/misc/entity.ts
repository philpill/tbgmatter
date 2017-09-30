import settings from '../misc/settings';
import { IComponent } from '../misc/iComponent';
import InputComponent from '../components/input';
import DisplayComponent from '../components/display';
import * as Matter from 'matter-js';
import { SystemType, Colours } from '../misc/enum';
import { NodeComponents } from './node';

export default class Entity {

    id: string;
    isActive: boolean;
    components: NodeComponents;

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
        switch(component.type) {
            case SystemType.CONTROL:
                this.components.input = component as InputComponent;
                break;
            case SystemType.RENDER:
                this.components.display = component as DisplayComponent;
                break;
        }
    }

    addComponents(...components: IComponent[]) {
        components.map(this.addComponent.bind(this));
    }

    removeComponent(componentType: SystemType) {
        switch(componentType) {
            case SystemType.CONTROL:
                this.components.input.destroy();
                this.components.input = null;
                break;
            case SystemType.RENDER:
                this.components.display.destroy();
                this.components.display = null;
                break;
        }
    }

    destroy() {

        this.isActive = false;
        this.components = {};
    }
}