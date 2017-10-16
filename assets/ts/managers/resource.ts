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

        // this._preload.on('fileload', (e) => {
        //     console.log(e);
        // }, this);

        this._preload.loadManifest('/static/data/manifest/maps.json');
        this._preload.loadManifest('/static/data/manifest/wav.json');
        this._preload.loadManifest('/static/data/manifest/img.json');

        return new Promise((resolve,reject) => {
            this._preload.on('complete', resolve, this);
            this._preload.on('error', reject, this);
        });
    }

    getImagePath(resourceId: string): string {

        let item = this._preload.getItem(resourceId);

        return item.src;
    }

    getLevelData(index: number) {

        let items = this._preload.getItems(true);
        let item = this._preload.getResult(items[0].result.manifest[index].id);

        return item;
    }

    getFinalLevel() {

        let items = this._preload.getItems(true);
        let length = items[0].result.manifest.length;
        let item = this._preload.getResult(items[0].result.manifest[length - 1].id);

        return item;
    }

    getAudioData(resourceId: string) {

        let items = this._preload.getItems(true);

        let results = items[1].result.manifest.filter((item) => {
            return item.id === resourceId;
        });

        return results.length ? results[0].src : null;
    }
}





