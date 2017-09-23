import Settings from '../misc/settings';

declare var createjs: any; // until they sort out their @types

export default class ResourceManager {

    private _settings: Settings;

    constructor(settings: Settings) {

        this._settings = settings;

        var preload = new createjs.LoadQueue(false);

        preload.on('complete', () => {

            console.log(preload.getResult('json-level1'));

        }, this);

        preload.loadManifest([
            { id: 'json-level1', src:'/static/data/maps/level1.json' },
            { id: 'audio-hup', src:'/static/wav/hup.wav' }
        ]);

    }
}