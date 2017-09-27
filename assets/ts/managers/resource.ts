import settings from '../misc/settings';

declare var createjs: any; // until they sort out their @types

let instance = null;

export default class ResourceManager {

    private static _instance: ResourceManager;

    private _preload: any;

    private constructor() {

        this._preload = new createjs.LoadQueue(true);
    }

    static Instance()
    {
        return this._instance || (this._instance = new this());
    }

    async load(): Promise<any> {

        this._preload.on('fileload', (e) => {
            console.log(e);
        }, this);

        this._preload.loadManifest('/static/data/manifest/maps.json');
        this._preload.loadManifest('/static/data/manifest/wav.json');
        this._preload.loadManifest('/static/data/manifest/img.json');

        return new Promise((resolve,reject) => {
            this._preload.on('complete', resolve, this);
            this._preload.on('error', reject, this);
        });
    }

    getLevelData(index: number) {

        let items = this._preload.getItems(true);
        let item = this._preload.getResult(items[0].result.manifest[index].id);

        return item;
    }
}





