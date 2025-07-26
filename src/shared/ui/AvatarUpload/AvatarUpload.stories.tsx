import AvatarUpload, { type AvatarUploadProps } from './AvatarUpload';
import type { Meta, StoryFn } from '@storybook/react-vite';

export default {
  title: 'UI/AvatarUpload',
  component: AvatarUpload,
} as Meta;

const Template: StoryFn<AvatarUploadProps> = (args) => (
  <AvatarUpload {...args} />
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
