import React from 'react';
import styles from './CardSkill.module.css';
import { getCategoryColor } from './categories';

type TeachingSkill = {
  category: string;
  subcategories: string;
  skillName: string;
  id: number;
};

type LearningSkill = {
  category: string;
  subcategory: string;
};

type CardSkillType = TeachingSkill | LearningSkill;

interface CardSkillProps {
  skill: CardSkillType;
}

export const CardSkill: React.FC<CardSkillProps> = ({ skill }) => {
  const label =
    'skillName' in skill
      ? skill.skillName
      : 'subcategory' in skill
        ? skill.subcategory
        : 'Неизвестный навык';

  const categoryColor = getCategoryColor(skill.category);

  return (
    <span className={`${styles.tag} ${styles[categoryColor]}`}>{label}</span>
  );
};
