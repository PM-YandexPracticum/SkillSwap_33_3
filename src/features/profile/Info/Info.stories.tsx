import { Component as Info } from './Info';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../index.css';

const meta: Meta<typeof Info> = {
  title: 'Features/Profile/Info',
  component: Info,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Info>;

export const Default: Story = {
  render: () => <Info />,
};
