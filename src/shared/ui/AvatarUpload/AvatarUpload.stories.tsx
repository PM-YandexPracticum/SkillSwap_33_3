import AvatarUpload, { type AvatarUploadProps } from './AvatarUpload';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

export default {
  title: 'UI/AvatarUpload',
  component: AvatarUpload,
} as Meta;

const Template: StoryFn<AvatarUploadProps> = (args) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <AvatarUpload
      {...args}
      value={file}
      onChange={(newFile) => {
        setFile(newFile);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  onChange: (file: File) => console.log('Файл загружен:', file.name),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  onChange: (file: File) => console.log('Файл загружен:', file.name),
};
