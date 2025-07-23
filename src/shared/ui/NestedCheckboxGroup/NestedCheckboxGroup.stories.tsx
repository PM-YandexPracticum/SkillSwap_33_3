import type { Meta, StoryObj } from '@storybook/react-vite';
import { NestedCheckboxGroup } from './NestedCheckboxGroup';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof NestedCheckboxGroup> = {
  title: 'Components/NestedCheckboxGroup',
  component: NestedCheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['none', 'some', 'all'],
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof NestedCheckboxGroup>;

export const Default: Story = {
  args: {
    title: 'Категория навыков',
    mode: 'none',
    children: (
      <>
        <Checkbox>JavaScript</Checkbox>
        <Checkbox>TypeScript</Checkbox>
        <Checkbox>React</Checkbox>
      </>
    ),
  },
};

export const PartiallySelected: Story = {
  args: {
    ...Default.args,
    mode: 'some',
    title: 'Частично выбранная категория',
  },
};

export const FullySelected: Story = {
  args: {
    ...Default.args,
    mode: 'all',
    title: 'Полностью выбранная категория',
  },
};

export const WithManyItems: Story = {
  args: {
    ...Default.args,
    title: 'Категория с большим количеством элементов',
    children: (
      <>
        <Checkbox>HTML</Checkbox>
        <Checkbox>CSS</Checkbox>
        <Checkbox>JavaScript</Checkbox>
        <Checkbox>TypeScript</Checkbox>
        <Checkbox>React</Checkbox>
        <Checkbox>Node.js</Checkbox>
        <Checkbox>Express</Checkbox>
      </>
    ),
  },
};

export const InitiallyExpanded: Story = {
  args: {
    ...Default.args,
    title: 'Изначально раскрытая категория',
    children: (
      <>
        <Checkbox checked>Vue</Checkbox>
        <Checkbox>Angular</Checkbox>
        <Checkbox>Svelte</Checkbox>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
