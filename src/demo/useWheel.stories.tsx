import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { useWheel } from '../lib/useWheel';
import { useInteractions } from '../lib/useInteractions';

function Button() {
  return <button>test</button>
}

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

function WheelStory() {
  const ref = useRef(null);

  const interactionRef = useRef<HTMLDivElement>(null);

  useWheel(ref, (event) => {
    console.log(event);
  });

  useInteractions(interactionRef, {
    onDrag: (start, end, movement) => {
      console.log(start, end, movement);
    },
    onClick: (position) => {
      console.log("click", position);
    },
    onMouseMove: (position) => {
      console.log("move", position);
    }
  });

  return <>
    <div ref={interactionRef} style={{ width: 300, height: 300, border: "1px solid black" }} />
    <Button />
  </>
}

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <WheelStory />,
};