import { IComponent } from '../misc/iComponent';
import settings from '../misc/settings';
import { SystemType } from '../misc/enum';
import AudioManager from '../managers/audio';

export default class AudioComponent implements IComponent {

    type: SystemType;

    constructor(options) {

        this.type = SystemType.AUDIO;
    }

    destroy() {

    }
}