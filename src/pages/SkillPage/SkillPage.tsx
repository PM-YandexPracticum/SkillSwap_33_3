import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers, selectUsers } from '@/features/slices/usersSlice';
import { Card } from '@/shared/ui/Card';
import { SkillCard } from '@/widgets/SkillCard';
import { Slider } from '@/widgets/Slider';
import { useEffect, useState } from 'react';
import styles from './SkillPage.module.css';
import { useParams } from 'react-router-dom';
import { skillsApi, type UserResponse } from '@/api/client';
import type { TSkillInfo } from '@/shared/lib/types';

function SkillPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserResponse>();
  const [skill, setSkill] = useState<TSkillInfo>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id)
      skillsApi.getById(parseInt(id)).then((res) => {
        setUser(res.user);
        setSkill(res.skill);
      });
  }, [id]);

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
