import type { TSkillInfo } from '../../lib/types';

import styles from './SkillInfo.module.css';

interface SkillInfoProps {
  skill: TSkillInfo;
}

export function SkillInfo({ skill }: SkillInfoProps) {
  return (
    <div className={styles.content}>
      <div className={styles.textBlock}>
        <div className={styles.topText}>
          <h2 className={styles.title}>{skill.skillName}</h2>
          <p className={styles.category}>
            {skill.category} / {skill.subcategory}
          </p>
        </div>
        <div className={styles.description}>{skill.description}</div>
      </div>
    </div>
  );
}
