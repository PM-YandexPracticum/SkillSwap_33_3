import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper: React.CSSProperties = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export const Default: Story = {
  args: {
    name: 'example',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Checkbox {...args} value="one">
        Option One
      </Checkbox>
      <Checkbox {...args} value="two" defaultChecked>
        Option Two
      </Checkbox>
      <Checkbox {...args} value="three" defaultChecked>
        Option Three
      </Checkbox>
    </div>
  ),
};
