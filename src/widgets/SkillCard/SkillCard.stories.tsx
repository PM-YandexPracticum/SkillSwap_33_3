import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillCard } from './SkillCard';
import type { TSkillInfo } from '../../shared/lib/types';
import '../../index.css';
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
  images: [
    'https://i.imgur.com/M8pv8qr.jpeg',
    'https://i.imgur.com/epgCz0b.jpeg',
    'https://i.imgur.com/xirrmHa.jpeg',
    'https://i.imgur.com/qp9yUUm.jpeg',
  ],
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
