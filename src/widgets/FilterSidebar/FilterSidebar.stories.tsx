import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterSidebar as Component } from './FilterSidebar';
import type { Filters } from '../../shared/lib/types';
import { Provider } from 'react-redux';
import { store } from '../../app/store'; // Импорт Redux-стора

const meta = {
  title: 'Components/FilterSidebar',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    initialFilters: {
      description:
        'Начальные значения фильтров для отображения выбранных опций',
      control: {
        type: 'object',
      },
      table: {
        type: { summary: 'Filters' },
        defaultValue: {
          summary: JSON.stringify({
            mode: 'Всё',
            subcategories: [],
            gender: 'Не имеет значения',
            cities: [],
          }),
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

export const Default: Story = {
  args: {},
  render: () => (
    <div style={storyWrapper}>
      <Component />
    </div>
  ),
};

export const WithInitialFilters: Story = {
  args: {},
  render: () => {
    const initialFilters: Filters = {
      mode: 'learn',
      subcategories: ['Управление командой', 'Английский'],
      gender: 'female',
      cities: ['Москва'],
    };
    return (
      <div style={storyWrapper}>
        <Component initialFilters={initialFilters} />
      </div>
    );
  },
};
