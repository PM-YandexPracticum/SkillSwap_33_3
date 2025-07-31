import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboInput } from './ComboInput';
import type { ReactNode } from 'react';

const meta = {
  title: 'UI/ComboInput',
  component: ComboInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text', description: 'Метка поля' },
    placeholder: { control: 'text', description: 'Плейсхолдер для инпута' },
    defaultValue: { control: 'text', description: 'Значение по умолчанию' },
    onChange: { action: 'changed', description: 'Колбек при выборе значения' },
  },
} satisfies Meta<typeof ComboInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  maxWidth: 440,
};

const options: ReactNode[] = Array.from({ length: 100 }).map((_, i) => (
  <li key={`option_${i + 1}`} value={`option_${i + 1}`}>
    Option {i + 1}
  </li>
));

export const Default: Story = {
  args: {
    label: 'Город',
    placeholder: 'Не указан',
    defaultValue: '',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <ComboInput {...args}>{options}</ComboInput>
    </div>
  ),
};
