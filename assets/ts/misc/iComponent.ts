import { SystemType } from '../misc/enum';

export interface IComponent {

    destroy: Function;
    class: SystemType;
}