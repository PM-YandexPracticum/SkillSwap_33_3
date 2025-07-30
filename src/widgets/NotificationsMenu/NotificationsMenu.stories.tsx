import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationsMenu } from './NotificationsMenu';
import type { NotificationItem } from './NotificationsMenu';
import '../../index.css';

const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: now.toISOString(),
    viewed: false,
  },
  {
    id: '2',
    title: 'Татьяна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: now.toISOString(),
    viewed: false,
  },
  {
    id: '3',
    title: 'Олег предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: yesterday.toISOString(),
    viewed: true,
  },
  {
    id: '4',
    title: 'Игорь принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: '2024-05-23T12:00:00Z',
    viewed: true,
  },
];

const meta: Meta<typeof NotificationsMenu> = {
  title: 'widgets/NotificationsMenu',
  component: NotificationsMenu,
  args: {
    notifications,
    onFollowLink: (id) => alert(`Перейти к уведомлению ${id}`),
    onRead: (ids) => alert(`Отмечены прочитанными: ${ids.join(', ')}`),
    onRemove: (ids) => alert(`Удалены: ${ids.join(', ')}`),
  },
};

export default meta;

type Story = StoryObj<typeof NotificationsMenu>;

export const Default: Story = {};
