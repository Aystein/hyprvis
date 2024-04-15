import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { lassoToSvgPath, useLasso } from '../lib/useLasso';

const meta: Meta = {};

export default meta;
type Story = StoryObj;

function LassoStory() {
  const interactionRef = useRef(null);

  const { lasso } = useLasso(interactionRef, {});

  return <>
    <div style={{ position: 'relative', width: 300, height: 300, border: '1px solid black' }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        { lasso ? <path d={lassoToSvgPath(lasso)} fill="none" stroke="black" strokeWidth={2} strokeDasharray={4} /> : null }
      </svg>
      <div ref={interactionRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  </>
}

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Lasso: Story = {
  name: "Lasso",
  render: () => <LassoStory />,
};