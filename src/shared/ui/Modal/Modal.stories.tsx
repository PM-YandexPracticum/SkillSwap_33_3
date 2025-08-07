import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Открыть модалку</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2 style={{ marginBottom: '1rem' }}>Контент модалки</h2>
          <p>Это пример модального окна</p>
        </Modal>
      </>
    );
  },
};
