// Обновленный SkillPage.tsx
import { useSelector } from '@/app/store';
import { Card } from '@/shared/Card';
import { Slider } from '@/widgets/Slider';
import { SkillCard } from '@/widgets/SkillCard';
import { useParams } from 'react-router-dom';
import { useSkillData } from './hooks/useSkillData.ts';
import { getLearningSkills } from '@/shared/lib/utils';
import styles from './SkillPage.module.scss';

export const SkillPage = () => {
  const { id } = useParams();
  const currentSkill = useSelector((state) => state.skills.currentSkill);
  const users = useSelector((state) => state.users.users);

  useSkillData(id || '');

  if (!currentSkill) return <div>Загрузка...</div>;

  // Фильтруем пользователей, которые хотят изучать этот навык
  const learners = users.filter((user) =>
    getLearningSkills(user).some(
      (skill) => skill.subcategory === currentSkill.subcategory
    )
  );

  return (
    <div className={styles.skillPage}>
      <section className={styles.skillSection}>
        <Card>
          <SkillCard
            skill={currentSkill}
            user={mockTeacher} // Здесь нужно получить реального преподавателя
            isDetailed={true}
          />
        </Card>
      </section>

      {learners.length > 0 && (
        <section className={styles.learnersSection}>
          <h2>Хотят изучить этот навык:</h2>
          <Slider
            items={learners}
            renderItem={(user) => (
              <Card key={user.id}>
                <UserCard user={user} />
              </Card>
            )}
          />
        </section>
      )}
    </div>
  );
};
