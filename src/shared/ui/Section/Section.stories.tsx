import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Section } from './Section';
import { Button } from '../Button';

import ChevronRightIcon from '../../../assets/svg/icons/chevron-right.svg?react';

const meta = {
  title: 'UI/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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

const Cards: React.FC = () => (
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
    button: (
      <Button
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        variant="tertiary"
      >
        Example Button
        <ChevronRightIcon />
      </Button>
    ),
  },
  render: (args) => (
    <div style={storyWrapper}>
      <Section {...args}>
        <Cards />
      </Section>
    </div>
  ),
};
