import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template as Component } from './template.tsx';

/*
  РЕГУЛИРУЕМЫЕ ОПЦИИ (настройте при создании компонента):
  1. Импорт компонента:
     - Замените 'Template' на имя вашего компонента
     - Пример: import { Button as Component } from './Button'
  2. Обновите путь в title (Group/Component)
  3. Настройте параметры layout (centered/padded/fullscreen)
  4. Добавьте пропсы компонента в args
  5. Настройте render-функции по необходимости
*/

const meta = {
  title: 'Group/Component', // 1. Укажите путь в Storybook
  component: Component, // 2. Импортируемый компонент
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 3. Варианты расположения
  },
  argTypes: {
    // 4. Добавьте типы пропсов вашего компонента
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Вариант внешнего вида',
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// Пример выноса общих стилей
const storyWrapper = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
};

// 4. Базовая история
export const Default: Story = {
  args: {
    // 5. Стандартные пропсы компонента
    children: 'Template Component',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

// 7. Альтернативное состояние
export const SecondaryVariant: Story = {
  args: {
    ...Default.args,
    // 8. Специфичные пропсы для варианта
    variant: 'secondary',
    children: 'Secondary Variant',
  },
  render: (args) => (
    <div style={{ ...storyWrapper, border: '1px dashed #ccc' }}>
      <Component {...args} />
    </div>
  ),
};
