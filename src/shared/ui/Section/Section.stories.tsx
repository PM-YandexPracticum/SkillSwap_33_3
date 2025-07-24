import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Section } from './Section';

const meta = {
  title: 'UI/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper: React.CSSProperties = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
};

const cardsData = ['#000', '#999', '#000', '#999', '#000'];

const Cards = () => (
  <>
    {cardsData.map((color, i) => (
      <div
        key={i}
        style={{ width: 324, height: 368, backgroundColor: color }}
      />
    ))}
  </>
);

export const Default: Story = {
  args: {
    title: 'Example Title',
    buttonTitle: 'Button Title',
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Section {...args}>
        <Cards />
      </Section>
    </div>
  ),
};
