import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';
import '../../../index.css';

const meta: Meta<typeof Notification> = {
  title: 'shared/Notification',
  component: Notification,
  args: {
    id: '1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: new Date().toISOString(),
    viewed: false,
    onFollowLink: (id) => alert(`Перейти к уведомлению ${id}`),
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Unread: Story = {};

export const Read: Story = {
  args: {
    viewed: true,
  },
};
