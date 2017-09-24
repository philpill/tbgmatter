import { IRendererOptions } from 'matter-js';
// this is like, hacky as fuck

// augment module for old definitions
// http://www.typescriptlang.org/docs/handbook/declaration-merging.html
// https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'matter-js' {

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