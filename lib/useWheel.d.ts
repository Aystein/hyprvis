import { NormalizedWheelEvent } from './interfaces';
import { RefObject } from '../../node_modules/react';

/**
 * Adds active wheel listener to element and calls callback
 */
export declare function useWheel(ref: RefObject<HTMLElement>, callback: (event: NormalizedWheelEvent) => void): void;
