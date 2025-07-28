import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select as Component } from './Select';
import { Checkbox } from '../Checkbox';
import styles from './Select.module.css';

const meta = {
  title: 'shared/ui/Select',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  width: '436px',
  padding: '12px 20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
};

export const Default: Story = {
  args: {
    placeholder: 'Выберите категорию',
    children: (
      <>
        <div className={styles.option} data-value="business">
          Бизнес и карьера
        </div>
        <div className={styles.option} data-value="creative">
          Творчество и искусство
        </div>
        <div className={styles.option} data-value="languages">
          Иностранные языки
        </div>
      </>
    ),
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} />
    </div>
  ),
};

export const SingleWithCheckboxes: Story = {
  args: {
    label: 'Подкатегория навыка, которому хотите научиться',
    placeholder: 'Выберите подкатегорию',
    children: (
      <>
        <Checkbox name="single-category" value="drawing">
          Рисование и иллюстрация
        </Checkbox>
        <Checkbox name="single-category" value="photography">
          Фотография
        </Checkbox>
        <Checkbox name="single-category" value="video-editing">
          Видеомонтаж
        </Checkbox>
        <Checkbox name="single-category" value="music">
          Музыка и звук
        </Checkbox>
        <Checkbox name="single-category" value="acting">
          Актёрское мастерство
        </Checkbox>
        <Checkbox name="single-category" value="creative-writing">
          Креативное письмо
        </Checkbox>
        <Checkbox name="single-category" value="art-therapy">
          Арт-терапия
        </Checkbox>
        <Checkbox name="single-category" value="decor-diy">
          Декор и DIY
        </Checkbox>
      </>
    ),
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} value="" /> {}
    </div>
  ),
};

export const GenderSelect: Story = {
  args: {
    label: 'Пол',
    placeholder: 'Не указан',
    children: (
      <>
        <div className={styles.option} data-value="unspecified">
          Не указан
        </div>
        <div className={styles.option} data-value="male">
          Мужской
        </div>
        <div className={styles.option} data-value="female">
          Женский
        </div>
      </>
    ),
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Component {...args} value="" /> {}
    </div>
  ),
};
