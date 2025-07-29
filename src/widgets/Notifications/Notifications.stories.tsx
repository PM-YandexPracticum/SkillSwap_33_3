import type { Meta, StoryFn } from '@storybook/react-vite';
import type { Notification } from './Notifications';
import Notifications from './Notifications';

export default {
  title: 'Widgets/Notifications',
  component: Notifications,
} satisfies Meta<typeof Notifications>;

interface StoryArgs {
  notifications: Notification[];
}

const Template: StoryFn<StoryArgs> = (args) => (
  <Notifications
    notifications={args.notifications}
    onClose={(id) => console.log(`Closed notification ${id}`)}
  />
);

export const OlegExample = Template.bind({});
OlegExample.args = {
  notifications: [
    {
      id: '1',
      notification: 'Олег предлагает вам обмен',
    },
  ],
};

export const MultipleNotifications = Template.bind({});
MultipleNotifications.args = {
  notifications: [
    { id: '1', notification: 'Олег предлагает вам обмен' },
    { id: '2', notification: 'Анна приняла ваш запрос' },
    { id: '3', notification: 'Новое сообщение в чате' },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  notifications: [],
};
