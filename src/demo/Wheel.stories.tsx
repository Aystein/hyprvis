import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { useZoom } from '../lib/useZoom';

const meta: Meta = {};

export default meta;
type Story = StoryObj;

function WheelStory() {
  const interactionRef = useRef(null);

  const { zoom } = useZoom(interactionRef, {});

  return <>
    <div ref={interactionRef} style={{ position: 'relative', width: 300, height: 300, overflow: 'hidden', border: '1px dashed black' }}>
      <div style={{
        width: 150, height: 150,
        left: 75 * zoom.k, top: 75 * zoom.k,
        position: 'absolute', border: '1px solid black',
        transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.k})`,
        transformOrigin: '0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
          <div>k: {zoom.k.toPrecision(2)}</div>
          <div>x: {zoom.x.toPrecision(2)}</div>
          <div>y: {zoom.y.toPrecision(2)}</div>
        </div>
      </div>
    </div>
  </>
}

function ControlledWheelDemo() {
  const interactionRef = useRef(null);

  const [zoom, setZoom] = useState({ k: 1, x: 0, y: 0 });
  useZoom(interactionRef, {
    value: zoom,
    onChange: setZoom
  });

  return <>
    <div ref={interactionRef} style={{ position: 'relative', width: 300, height: 300, overflow: 'hidden', border: '1px dashed black' }}>
      <div style={{
        width: 150, height: 150,
        left: 75 * zoom.k, top: 75 * zoom.k,
        position: 'absolute', border: '1px solid black',
        transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.k})`,
        transformOrigin: '0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
          <div>k: {zoom.k.toPrecision(2)}</div>
          <div>x: {zoom.x.toPrecision(2)}</div>
          <div>y: {zoom.y.toPrecision(2)}</div>
        </div>
      </div>
    </div>
    <button onClick={() => setZoom({ k: 1, x: 0, y: 0 })}>Reset</button>
    <button onClick={() => setZoom({ k: zoom.k, x: zoom.x + 50, y: zoom.y })}>Move right</button>
  </>
}

export const Wheel: Story = {
  name: "Wheel",
  render: () => <WheelStory />
};

export const ControlledWheel: Story = {
  name: "Wheel Controlled",
  render: () => <ControlledWheelDemo />
};