import clsx from 'clsx';
import { CardSkill } from '../CardSkill';
import styles from './Card.module.css';
import { Button } from '../Button';
import LikeIcon from '../../../assets/svg/icons/likeIcon.svg?react';
import ClockIcon from '../../../assets/svg/icons/clockIcon.svg?react';
import type { UserResponse } from '../../../api/client';
import { ageString } from '../../lib/utils';
import {
  getLearningSkills,
  getTeachingSkills,
} from '../../../features/slices/usersSlice';

type CardProps = {
  user: UserResponse;
  liked: boolean;
  onLikeClick: () => void;
  onMoreClick: () => void;
  isProposed: boolean;
  variant?: 'primary' | 'secondary';
  filter?: string[];
};

export const Card: React.FC<CardProps> = ({
  user,
  liked,
  onLikeClick,
  onMoreClick,
  isProposed,
}: CardProps) => {
  const age = ageString(user.birthDate);
  const teachingSkills = getTeachingSkills(user);
  const learningSkills = getLearningSkills(user);
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <img className={styles.avatar} src={user.avatar} alt={user.name} />
        <div className={styles.infoText}>
          <LikeIcon
            className={clsx(styles.likeIcon, { [styles.likeActive]: liked })}
            onClick={onLikeClick}
            aria-hidden="true"
          />
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.cityAge}>
            {user.city}, {age}
          </p>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h4 className={styles.sectionTitle}>Может научить:</h4>
        <div className={styles.skillsRow}>
          {teachingSkills.slice(0, 2).map((skill, index) => (
            <CardSkill key={index} skill={skill} />
          ))}

          {teachingSkills.length - 2 > 0 && (
            <CardSkill skill={`+${teachingSkills.length - 2}`} />
          )}
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
        <div className={styles.skillsRow}>
          {learningSkills.slice(0, 2).map((skill, index) => (
            <CardSkill key={index} skill={skill} />
          ))}

          {learningSkills.length - 2 > 0 && (
            <CardSkill skill={`+${learningSkills.length - 2}`} />
          )}
        </div>
      </div>

      {!isProposed ? (
        <Button variant="primary" onClick={onMoreClick}>
          Подробнее
        </Button>
      ) : (
        <Button variant="secondary">
          <ClockIcon className={styles.icon} aria-hidden="true" />
          Обмен предложен
        </Button>
      )}
    </div>
  );
};
