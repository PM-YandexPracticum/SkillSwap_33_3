import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers, selectUsers } from '@/features/slices/usersSlice';
import { Card } from '@/shared/ui/Card';
import { SkillCard } from '@/widgets/SkillCard';
import { Slider } from '@/widgets/Slider';
import { useEffect } from 'react';
import styles from './SkillPage.module.css';

const mockUser = {
  email: 'ivan@yandex.ru',
  avatar: '/src/assets/img/avatars/avatar-ivan.jpg',
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

import img1 from '../../assets/img/skills/drums-1.jpg';
import img2 from '../../assets/img/skills/drums-2.jpg';
import img3 from '../../assets/img/skills/drums-3.jpg';
import img4 from '../../assets/img/skills/drums-4.jpg';

const mockSkill = {
  id: 1,
  skillName: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене c живыми группами.  Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
  images: [img1, img2, img3, img4],
};

export default function SkillPage() {
  const user = mockUser;
  const skill = mockSkill;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const recomendedUsers = useSelector(selectUsers);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.userSection}>
          <Card user={user} variant="skillPage" />
        </div>

        <div className={styles.skillSection}>
          <SkillCard skill={skill} onClick={() => {}} />
        </div>
      </div>

      <div className={styles.recommendations}>
        <h2 className={styles.recommendationsTitle}>Рекомендуем</h2>
        <Slider visible={4}>
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
      </div>
    </main>
  );
}
