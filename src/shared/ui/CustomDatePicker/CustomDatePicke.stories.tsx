import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomDatePicker } from './CustomDatePicker';
import { useState } from 'react';

const meta = {
  title: 'UI/CustomDatePicker',
  component: CustomDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CustomDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  maxWidth: 440,
};

export const Default: Story = {
  args: {
    selected: null,
    onChange: (date: Date | null) => {
      console.log(date);
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={storyWrapper}>
        <CustomDatePicker selected={date} onChange={setDate} />
      </div>
    );
  },
};
