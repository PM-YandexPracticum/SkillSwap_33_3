import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillInfo } from './index';
import type { TSkillInfo } from '../../lib/types';
import '../../../index.css';

const meta: Meta<typeof SkillInfo> = {
  title: 'Shared/SkillInfo',
  component: SkillInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SkillInfo>;

const rawSkill: TSkillInfo = {
  id: 1,
  skillName: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description: `Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. 
Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.`,
  images: [],
};

const mockSkill = {
  ...rawSkill,
  title: rawSkill.skillName,
};

export const Default: Story = {
  args: {
    skill: mockSkill,
  },
};
