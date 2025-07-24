import type { StoryFn } from '@storybook/react-vite';
import { Gallery } from './Gallery';

import img1 from '../../assets/img/skills/drums-1.jpg';
import img2 from '../../assets/img/skills/drums-2.jpg';
import img3 from '../../assets/img/skills/drums-3.jpg';
import img4 from '../../assets/img/skills/drums-4.jpg';

export default {
  title: 'Widgets/Gallery',
  component: Gallery,
};

const Template: StoryFn<typeof Gallery> = (args) => <Gallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: [img1, img2, img3, img4],
};
