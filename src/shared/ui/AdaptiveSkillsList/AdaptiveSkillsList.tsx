import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { CardSkill } from '../CardSkill';
import styles from './AdaptiveSkillsList.module.css';

type SkillType =
  | {
      category: string;
      skillName?: string;
      subcategory?: string;
      id?: number;
    }
  | string;

interface AdaptiveSkillsListProps {
  skills: SkillType[];
  maxVisible?: number;
  className?: string;
}

export const AdaptiveSkillsList: React.FC<AdaptiveSkillsListProps> = ({
  skills,
  maxVisible = 2,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showInlineMoreButton, setShowInlineMoreButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasHiddenSkills = skills.length > maxVisible;
  const visibleSkills = expanded ? skills : skills.slice(0, maxVisible);

  useEffect(() => {
    const checkSpace = () => {
      if (containerRef.current && hasHiddenSkills && !expanded) {
        const container = containerRef.current;
        const skills = Array.from(container.querySelectorAll('[data-skill]'));
        const moreButton = container.querySelector('[data-more-button]');

        if (skills.length > 0 && moreButton) {
          const containerRect = container.getBoundingClientRect();
          const moreButtonRect = moreButton.getBoundingClientRect();

          // Проверяем, помещается ли кнопка в той же строке
          const fitsInline = moreButtonRect.right <= containerRect.right;
          setShowInlineMoreButton(fitsInline);
        }
      }
    };

    checkSpace();
    window.addEventListener('resize', checkSpace);
    return () => window.removeEventListener('resize', checkSpace);
  }, [hasHiddenSkills, expanded, skills.length]);

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      <div className={styles.skillsRow}>
        {visibleSkills.map((skill, index) => (
          <CardSkill key={index} skill={skill} data-skill />
        ))}
        {hasHiddenSkills && !expanded && (
          <button
            className={styles.moreButton}
            onClick={() => setExpanded(true)}
            data-more-button
            style={{
              display: showInlineMoreButton ? 'inline-flex' : 'flex',
              marginLeft: showInlineMoreButton ? 'auto' : '0',
            }}
          >
            +{skills.length - maxVisible}
          </button>
        )}
      </div>
    </div>
  );
};
