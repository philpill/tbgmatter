import { IRendererOptions } from 'matter-js';
// this is like, hacky as fuck

// augment module for old definitions
// http://www.typescriptlang.org/docs/handbook/declaration-merging.html
// https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'matter-js' {

    export class Common {
        static extend: Function;
        static clone: Function;
        static keys: Function;
        static values: Function;
        static get: Function;
        static set: Function;
        static shuffle: Function;
        static choose: Function;
        static isElement: Function;
        static isArray: Function;
        static isFunction: Function;
        static isPlainObject: Function;
        static isString: Function;
        static clamp: Function;
        static sign: Function;
        static now: Function;
        static random : Function;
        static colorToNumber: Function;
        static logLevel: number;
        static log: Function;
        static info: Function;
        static warn: Function;
        static nextId: Function;
        static indexOf: Function;
        static map: Function;
        static topologicalSort: Function;
        static chain: Function;
        static chainPathBefore: Function;
        static chainPathAfter: Function;
    }

    interface IRendererOptions {
        width?: number,
        height?: number,
        pixelRatio?: number,
        background?: string,
        wireframeBackground?: string,
        hasBounds?: boolean,
        enabled?: boolean,
        wireframes?: boolean,
        showSleeping?: boolean,
        showDebug?: boolean,
        showBroadphase?: boolean,
        showBounds?: boolean,
        showVelocity?: boolean,
        showCollisions?: boolean,
        showSeparations?: boolean,
        showAxes?: boolean,
        showPositions?: boolean,
        showAngleIndicator?: boolean,
        showIds?: boolean,
        showShadows?: boolean,
        showVertexNumbers?: boolean,
        showConvexHulls?: boolean,
        showInternalEdges?: boolean,
        showMousePosition?: boolean
    }
}