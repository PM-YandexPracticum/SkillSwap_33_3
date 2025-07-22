import React from 'react';
import clsx from 'clsx';
import styles from './CardSkill.module.css';
import { getCategoryColor } from './categories';

type CardSkillType = {
  category: string;
  skillName?: string;
  subcategory?: string;
  id?: number;
};

interface CardSkillProps {
  skill: CardSkillType;
}

export const CardSkill: React.FC<CardSkillProps> = ({ skill }) => {
  const label = skill.skillName ?? skill.subcategory ?? 'Неизвестный навык';

  const categoryColor = getCategoryColor(skill.category);

  return (
    <span className={clsx(styles.tag, styles[categoryColor])}>{label}</span>
  );
};
