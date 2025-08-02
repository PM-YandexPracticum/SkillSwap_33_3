import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import type { UserResponse } from '../../../api/client';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'skillPage'],
    },
    onLikeClick: { action: 'clicked' },
    onMoreClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

const user: UserResponse = {
  email: 'ivan@yandex.ru',
  avatar: `/src/assets/img/avatars/avatar-ivan.jpg`,
  name: 'Иван',
  birthDate: '1991-01-01',
  gender: 'male',
  city: 'Санкт-Петербург',
  aboutMe:
    'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
  teachingSkills: [
    {
      category: 'Творчество и искусство',
      subcategory: 'Музыка и звук',
      skillName: 'Игра на барабанах',
      id: 1,
    },
    {
      category: 'Здоровье и лайфстайл',
      subcategory: 'Физические тренировки',
      skillName: 'Кроссфит',
      id: 2,
    },
  ],
  learningSkills: [
    {
      category: 'Бизнес и карьера',
      subcategory: 'Тайм-менеджмент',
    },
    {
      category: 'Здоровье и лайфстайл',
      subcategory: 'Йога и медитация',
    },
    {
      category: 'Технологии',
      subcategory: 'Программирование',
    },
  ],
  likes: 31,
  id: '1',
};

export const Default: Story = {
  args: {
    user,
    variant: 'default',
    isProposed: false,
    liked: false,
    onLikeClick: () => {},
    onMoreClick: () => {},
  },
};

export const Secondary: Story = {
  args: {
    user,
    variant: 'default',
    isProposed: true,
    liked: true,
    onLikeClick: () => {},
    onMoreClick: () => {},
  },
};

export const SkillPageVariant: Story = {
  args: {
    user,
    variant: 'skillPage',
    isProposed: false,
    liked: false,
    onLikeClick: () => {},
    onMoreClick: () => {},
  },
};
