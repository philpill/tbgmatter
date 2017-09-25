import { ISettings } from '../misc/iSettings';

export default class EntityManager {

    private _settings: ISettings;
    private _entities: any[];

    constructor(settings: ISettings) {

        this._settings = settings;
        this._entities = [];
    }

    addEntities(entities: any[]) {

        this._entities.push(...entities);
    }
}