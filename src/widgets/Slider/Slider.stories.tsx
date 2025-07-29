import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';
import { Card } from '../../shared/ui/Card';
import users from '../../../public/db/users.json';

// Импортируем все аватары явно
import avatarIvan from '../../assets/img/avatars/avatar-ivan.jpg';
import avatarAnna from '../../assets/img/avatars/avatar-anna.jpg';
import avatarMaksim from '../../assets/img/avatars/avatar-maksim.jpg';
import avatarIlona from '../../assets/img/avatars/avatar-ilona.jpg';
import avatarMihail from '../../assets/img/avatars/avatar-mihail.jpg';
import avatarMaria from '../../assets/img/avatars/avatar-maria.jpg';
import avatarVictoria from '../../assets/img/avatars/avatar-victoria.jpg';
import avatarElizaveta from '../../assets/img/avatars/avatar-elizaveta.jpg';
import avatarElena from '../../assets/img/avatars/avatar-elena.jpg';
import avatarKonstantin from '../../assets/img/avatars/avatar-konstantin.jpg';
import avatarSofia from '../../assets/img/avatars/avatar-sofia.jpg';
import avatarEkaterina from '../../assets/img/avatars/avatar-ekaterina.jpg';
import avatarDaria from '../../assets/img/avatars/avatar-darya.jpg';
import avatarAlla from '../../assets/img/avatars/avatar-alla.jpg';

const avatarMap: Record<string, string> = {
  'avatar-ivan.jpg': avatarIvan,
  'avatar-anna.jpg': avatarAnna,
  'avatar-maksim.jpg': avatarMaksim,
  'avatar-ilona.jpg': avatarIlona,
  'avatar-mihail.jpg': avatarMihail,
  'avatar-maria.jpg': avatarMaria,
  'avatar-victoria.jpg': avatarVictoria,
  'avatar-elizaveta.jpg': avatarElizaveta,
  'avatar-victoria-2.jpg': avatarVictoria, // fallback
  'avatar-elena.jpg': avatarElena,
  'avatar-konstantin.jpg': avatarKonstantin,
  'avatar-sofia.jpg': avatarSofia,
  'avatar-ekaterina.jpg': avatarEkaterina,
  'avatar-darya.jpg': avatarDaria,
  'avatar-alla.jpg': avatarAlla,
};

const meta: Meta<typeof Slider> = {
  title: 'Widgets/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: 'Number of visible cards at once',
    },
    label: {
      control: 'text',
      description: 'Slider section title',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

const generateCards = (count: number = users.length) => {
  return users.slice(0, count).map((user) => {
    const avatarName = user.avatar.split('/').pop() || 'avatar-ivan.jpg';
    const avatar = avatarMap[avatarName] || avatarIvan; // fallback

    return (
      <Card
        key={user.id}
        user={{
          ...user,
          avatar: avatar,
        }}
        liked={parseInt(user.id) % 3 === 0}
        onLikeClick={() => console.log(`Like clicked for ${user.name}`)}
        onMoreClick={() => console.log(`More clicked for ${user.name}`)}
        isProposed={parseInt(user.id) % 4 === 0}
      />
    );
  });
};

export const DefaultView: Story = {
  args: {
    label: 'Рекомендуемые пользователи',
    visible: 4,
    children: generateCards(8),
  },
  name: 'Стандартный вид (4 из 8)',
};

export const FewCardsView: Story = {
  args: {
    label: 'Небольшая подборка',
    visible: 4,
    children: generateCards(5),
  },
  name: 'Мало карточек (4 из 5)',
};

export const ExactCountView: Story = {
  args: {
    label: 'Точное количество',
    visible: 4,
    children: generateCards(4),
  },
  name: 'Ровно 4 карточки',
};

export const ManyCardsView: Story = {
  args: {
    label: 'Большая коллекция',
    visible: 4,
    children: generateCards(15),
  },
  name: 'Много карточек (4 из 15)',
};

export const NoLabelView: Story = {
  args: {
    visible: 4,
    children: generateCards(6),
  },
  name: 'Без заголовка',
};
