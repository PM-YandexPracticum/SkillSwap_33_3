import type { Meta, StoryObj } from '@storybook/react-vite';
import { Component } from './Component';

/*
  РЕГУЛИРУЕМЫЕ ОПЦИИ (настройте при создании компонента):
  1. Замените 'Component' на имя вашего компонента
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
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// 4. Базовая история
export const Default: Story = {
  args: {
    // 5. Стандартные пропсы компонента
  },
  // render: (args) => (
  //     // 6. Базовая обертка компонента
  //     <Component {...args} />
  // ),
};

// 7. Альтернативное состояние
export const Variant: Story = {
  args: {
    ...Default.args,
    // 8. Специфичные пропсы для варианта
    variant: 'secondary',
  },
  // render: (args) => (
  //     // 9. Кастомный рендер с оберткой
  //     <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
  //         <Component {...args} />
  //     </div>
  // ),
};

// Пример выноса общих стилей
// const storyWrapper = {
//     padding: '2rem',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
// };
