import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormInput as Component } from './FormInput';
import EyeIcon from '../../../assets/svg/icons/eye.svg?react';

const meta = {
  title: 'Shared/FormInput',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок поля ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка в поле ввода',
    },
    value: {
      control: 'text',
      description: 'Значение поля',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '12px 20px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  width: '500px',
};

export const Default: Story = {
  args: {
    title: 'Имя',
    placeholder: 'Введите ваше имя',
    svg: <EyeIcon />,
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 'John Doe',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Обязательное поле',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};
