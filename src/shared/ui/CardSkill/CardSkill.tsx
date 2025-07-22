import React from 'react';
import clsx from 'clsx';
import styles from './CardSkill.module.css';
import { getCategoryColor } from './categories';

type CardSkillType =
  | {
      category: string;
      skillName?: string;
      subcategory?: string;
      id?: number;
    }
  | string;

interface CardSkillProps {
  skill: CardSkillType;
}

export const CardSkill: React.FC<CardSkillProps> = ({ skill }) => {
  const label =
    typeof skill === 'string' ? skill : (skill.skillName ?? skill.subcategory);

  const categoryColor = getCategoryColor(
    typeof skill === 'string' ? 'Unknown' : skill.category
  );

  return (
    <span className={clsx(styles.tag, styles[categoryColor])}>{label}</span>
  );
};
