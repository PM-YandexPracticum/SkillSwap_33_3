import { useEffect } from 'react';
import { useDispatch } from '@/store';
import { setCurrentSkill } from '@/features/slices/skillsSlice';

export const useSkillData = (skillId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mockSkill = {
      id: parseInt(skillId),
      category: 'Программирование',
      subcategory: 'TypeScript',
      skillName: 'Продвинутый TypeScript',
      description: 'Глубокое понимание продвинутых концепций TypeScript',
      images: ['/assets/skills/typescript-advanced.jpg'],
    };

    dispatch(setCurrentSkill(mockSkill));
  }, [skillId, dispatch]);
};
