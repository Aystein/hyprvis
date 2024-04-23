import { ScaleLinear } from 'd3-scale';
import { mat4, quat, vec3 } from 'gl-matrix';
import { ZoomTransform } from './interfaces';

export function identityZoom(): ZoomTransform {
  return mat4.create();
}

export function invertX(transform: ZoomTransform, x: number) {
  const translation = mat4.getTranslation(vec3.create(), transform);
  const scale = mat4.getScaling(vec3.create(), transform);
  return (x - translation[0]) / scale[0];
}

export function invertY(transform: ZoomTransform, y: number) {
  const translation = mat4.getTranslation(vec3.create(), transform);
  const scale = mat4.getScaling(vec3.create(), transform);
  return (y - translation[1]) / scale[1];
}

export function rescaleX(transform: ZoomTransform, x: ScaleLinear<number, number>) {
  const newDomain = x
    .range()
    .map((r) => invertX(transform, r))
    .map((r) => x.invert(r));
  return x.copy().domain(newDomain);
}

export function rescaleY(transform: ZoomTransform, y: ScaleLinear<number, number>) {
  const newDomain = y
    .range()
    .map((r) => invertY(transform, r))
    .map((r) => y.invert(r));
  return y.copy().domain(newDomain);
}

export function translate(transform: ZoomTransform, x: number, y: number) {
  const scale = mat4.getScaling(vec3.create(), transform);
  const newTransform = mat4.clone(transform);
  newTransform[12] += x * scale[0];
  newTransform[13] += y * scale[1];
  return newTransform;
}

export function defaultConstraint(transform: ZoomTransform, width: number, height: number) {
  const x0 = invertX(transform, 0);
  const x1 = invertX(transform, width) - width;
  const y0 = invertY(transform, 0);
  const y1 = invertY(transform, height) - height;

  return translate(transform, x1 > x0 ? (x0 + x1) / 2 : Math.min(0, x0) || Math.max(0, x1), y1 > y0 ? (y0 + y1) / 2 : Math.min(0, y0) || Math.max(0, y1));
}

/**
 * Given a zoom transform, a mouse position and a wheel delta, calculate the new zoom transform
 */
export function calculateTransform(zoom: ZoomTransform, x: number, y: number, wheel: number, direction: 'x' | 'y' | 'xy') {
  const translation = mat4.getTranslation(vec3.create(), zoom);
  const scale = mat4.getScaling(vec3.create(), zoom);

  const zoomFactor = Math.exp(wheel * 0.1);

  const newScaleX = Math.max(1, zoomFactor * scale[0]);
  const newScaleY = Math.max(1, zoomFactor * scale[1]);
  // const newScale = zoomFactor * zoom.k;

  // downscaled coordinates relative to anchor
  const zoomPointX = (x - translation[0]) / scale[0];
  const zoomPointY = (y - translation[1]) / scale[1];

  const offsetX = -(zoomPointX * (newScaleX - scale[0]));
  const offsetY = -(zoomPointY * (newScaleY - scale[1]));

  const newX = translation[0] + offsetX;
  const newY = translation[1] + offsetY;

  return mat4.fromRotationTranslationScale(
    mat4.create(),
    quat.create(),
    vec3.fromValues(direction !== 'y' ? newX : translation[0], direction !== 'x' ? newY : translation[1], 0),
    vec3.fromValues(direction !== 'y' ? newScaleX : scale[0], direction !== 'x' ? newScaleY : scale[1], 0),
  );
}
