import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers, selectUsers } from '@/features/slices/usersSlice';
import { Card } from '@/shared/ui/Card';
import { SkillCard } from '@/widgets/SkillCard';
import { Slider } from '@/widgets/Slider';
import { useEffect, useState } from 'react';
import styles from './SkillPage.module.css';
import { useParams } from 'react-router-dom';
import type { UserResponse } from '@/api/client';
import type { TSkillInfo } from '@/shared/lib/types';

const mock = {
  skill: {
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
  },
  user: {
    email: 'ivan@yandex.ru',
    avatar: 'https://i.imgur.com/3mHr9FH.jpeg',
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
    id: 1,
  },
};

function SkillPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserResponse>();
  const [skill, setSkill] = useState<TSkillInfo>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  setUser(mock.user);
  setSkill(mock.skill);
  console.log(id);

  const recomendedUsers = useSelector(selectUsers);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {user && skill && (
          <>
            <Card user={user} variant="skillPage" />

            <SkillCard skill={skill} onClick={() => {}} />
          </>
        )}
      </div>

      <Slider label="Похожие предложения" visible={4}>
        {recomendedUsers.map((user) => (
          <Card
            key={user.id}
            user={user}
            liked={false}
            onLikeClick={() => {}}
            onMoreClick={() => {}}
            isProposed={false}
          />
        ))}
      </Slider>
    </main>
  );
}

export const Component = SkillPage;
