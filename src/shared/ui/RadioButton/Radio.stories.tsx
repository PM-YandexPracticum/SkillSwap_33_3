import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioButton } from './RadioButton';

const meta = {
  title: 'UI/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof RadioButton>;

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
  args: {
    name: 'example',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <label style={labelStyle}>
        <RadioButton {...args} />
        Option One
      </label>
      <label style={labelStyle}>
        <RadioButton {...args} />
        Option Two
      </label>
      <label style={labelStyle}>
        <RadioButton {...args} />
        Option Three
      </label>
    </div>
  ),
};
