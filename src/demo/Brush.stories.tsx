import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { BrushRect } from '../lib/Brush';
import { useBrush } from '../lib/useBrush';

const meta: Meta = {};

export default meta;
type Story = StoryObj;



function BrushStory({ direction }: { direction?: "horizontal" | "vertical" | "both" }) {
  const boundaries = useRef(null);

  const { brush, setBrush } = useBrush(boundaries, {
    direction
  });

  return <>
    <div style={{ position: 'relative', width: 300, height: 300, border: '1px dashed black' }}>
      <svg ref={boundaries} style={{ position: 'absolute', width: '100%', height: '100%' }}>
        
        {
          brush ? <BrushRect parent={boundaries} direction={direction} onChange={(brush) => {
            setBrush(brush)
        }} brush={brush} /> : null }
      </svg>
    </div>
  </>
}

export const HorizontalBrush: Story = {
  name: "Horizontal Brush",
  render: () => <BrushStory direction='horizontal' />,
};

export const VerticalBrush: Story = {
  name: "Vertical Brush",
  render: () => <BrushStory direction='vertical' />,
};

export const BothBrush: Story = {
  name: "Both Brush",
  render: () => <BrushStory direction='both' />,
};