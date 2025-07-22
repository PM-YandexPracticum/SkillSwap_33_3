import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    onLikeClick: { action: 'clicked' },
    onMoreClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const CardStory: Story = {
  render: () => {
    return (
      <Card
        user={{
          avatar: '/avatar-ivan.jpg',
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
              category: 'Творчество и искусство',
              subcategory: 'Дизайн',
            },
          ],
          id: '1',
        }}
        ageText={'34 года'}
        liked={true}
        onLikeClick={() => {}}
        onMoreClick={() => {}}
        isProposed={false}
      />
    );
  },
};
