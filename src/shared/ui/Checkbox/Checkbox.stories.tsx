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
  gap: '5px',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={storyWrapper}>
      <label style={labelStyle}>
        <Checkbox {...args} />
        Option One
      </label>
      <label style={labelStyle}>
        <Checkbox {...args} />
        Option Two
      </label>
      <label style={labelStyle}>
        <Checkbox {...args} />
        Option Three
      </label>
    </div>
  ),
};
