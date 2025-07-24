import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterSidebar as Component } from './FilterSidebar';

const meta = {
  title: 'Components/FilterSidebar',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Можно добавить argTypes если у компонента есть пропсы
  },
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
      subcategories: ['business', 'languages'],
      gender: 'female',
      cities: ['moscow'],
    };
    return (
      <div style={storyWrapper}>
        <Component initialFilters={initialFilters} />
      </div>
    );
  },
};
