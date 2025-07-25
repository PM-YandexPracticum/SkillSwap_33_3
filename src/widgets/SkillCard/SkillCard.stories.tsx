import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillCard } from './SkillCard';
import type { TSkillInfo } from '../../shared/lib/types';
import '../../index.css';
import img1 from '../../assets/img/skills/drums-1.jpg';
import img2 from '../../assets/img/skills/drums-2.jpg';
import img3 from '../../assets/img/skills/drums-3.jpg';
import img4 from '../../assets/img/skills/drums-4.jpg';

const meta: Meta<typeof SkillCard> = {
  title: 'Entities/SkillCard',
  component: SkillCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SkillCard>;

const rawSkill: TSkillInfo = {
  id: 1,
  skillName: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене c живыми группами.  Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
  images: [img1, img2, img3, img4],
};

const mockSkill = {
  ...rawSkill,
  title: rawSkill.skillName,
};

export const Default: Story = {
  args: {
    skill: mockSkill,
    onClick: () => alert('Обмен предложен'),
  },
};
