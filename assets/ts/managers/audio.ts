import settings from '../misc/settings';
import * as Howler from 'howler';
import ResourceManager from './resource';

export default class AudioManager {

    private static _instance: AudioManager;

    private _resourceManager: ResourceManager;

    private constructor() {

        this._resourceManager = ResourceManager.Instance();
    }

    static Instance() {

        return this._instance || (this._instance = new this());
    }

    play(resourceId: string) {

        let resource = this._resourceManager.getAudioData(resourceId);

        var sound = new Howler.Howl({
            src: [resource]
        });

        sound.play();
    }

    destroy() {

    }
}