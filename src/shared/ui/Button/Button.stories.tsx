import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Вариант внешнего вида кнопки',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
};

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Button {...args} />
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Button {...args} />
    </div>
  ),
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Button {...args} />
    </div>
  ),
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    children: 'Transparent Button',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Button {...args} />
    </div>
  ),
};
