import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea as Component } from './TextArea';

import EditIcon from '../../../assets/svg/icons/edit.svg?react';

const meta = {
  title: 'shared/ui/TextArea',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Заголовок поля',
    },
    value: {
      control: 'text',
      description: 'Значение текстового поля',
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка в пустом поле',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения значения',
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '12px 20px',
  width: '436px',
};

export const Default: Story = {
  args: {
    label: 'Описание',
    placeholder: 'Коротко опишите, чему можете научить',
    svg: <EditIcon />,
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
    label: 'Описание',
    defaultValue:
      'Это предварительно заполненное текстовое поле с достаточным объемом для вертикальной прокрутки при необходимости. Компонент TextArea поддерживает многострочный ввод с автоматическими полосами прокрутки для переполнения. Используйте его для форм, комментариев и любого пользовательского ввода, требующего развернутого текста. Дизайн включает в себя корректные отступы, скругленные углы и адаптивное изменение размера.',
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
    label: 'Описание',
    value: 'Этот текст нельзя изменить',
    disabled: true,
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Поле без заголовка',
    svg: <EditIcon />,
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};
