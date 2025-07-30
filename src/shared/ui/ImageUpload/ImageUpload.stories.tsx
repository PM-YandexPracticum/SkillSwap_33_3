import type { Meta, StoryFn } from '@storybook/react-vite';
import { ImageUpload, type ImageUploadProps } from './ImageUpload';
import { useState } from 'react';

export default {
  title: 'UI/ImageUpload',
  component: ImageUpload,
} as Meta<typeof ImageUpload>;

const Template: StoryFn<ImageUploadProps> = (args) => {
  const [file, setFile] = useState<File[] | null>(null);

  return (
    <ImageUpload
      {...args}
      value={file}
      onChange={(newFile) => {
        setFile(newFile);
        newFile.forEach((file, index) => {
          console.log(`Файл ${index + 1}: ${file.name}`);
        });
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  onChange: (files: File[]) => {
    files.forEach((file, index) => {
      console.log(`Файл ${index + 1}: ${file.name}`);
    });
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  onChange: (files: File[]) => {
    files.forEach((file, index) => {
      console.log(`Файл ${index + 1}: ${file.name}`);
    });
  },
};
