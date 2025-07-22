import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            backgroundColor: '#f9faf7',
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
