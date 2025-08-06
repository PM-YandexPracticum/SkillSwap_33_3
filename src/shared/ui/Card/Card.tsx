import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import { Button } from '../Button';
import LikeIcon from '../../../assets/svg/icons/likeIcon.svg?react';
import ClockIcon from '../../../assets/svg/icons/clockIcon.svg?react';
import type { UserResponse } from '../../../api/client';
import { ageString } from '../../lib/utils';
import { getLearningSkills, getTeachingSkills } from '../../lib/utils';
import { AdaptiveSkillsList } from '../AdaptiveSkillsList';

type CardProps = {
  user: UserResponse;
  liked?: boolean;
  onLikeClick?: () => void;
  onMoreClick?: () => void;
  isProposed?: boolean;
  variant?: 'default' | 'skillPage';
  filter?: string[];
};

export const Card: React.FC<CardProps> = ({
  user,
  liked,
  onLikeClick,
  onMoreClick,
  isProposed,
  variant = 'default',
}) => {
  const navigate = useNavigate();
  const age = ageString(user.birthDate);
  const teachingSkills = getTeachingSkills(user);
  const learningSkills = getLearningSkills(user);

  const handleMoreClick = () => {
    if (teachingSkills.length > 0) {
      navigate(`/skills/${teachingSkills[0].id}`);
    } else if (onMoreClick) {
      onMoreClick();
    }
  };

  return (
    <div
      className={clsx(styles.card, variant === 'skillPage' && styles.skillPage)}
    >
      <div className={styles.info}>
        <img className={styles.avatar} src={user.avatar} alt={user.name} />
        <div className={styles.infoText}>
          {variant !== 'skillPage' && (
            <LikeIcon
              className={clsx(styles.likeIcon, { [styles.likeActive]: liked })}
              onClick={onLikeClick}
              aria-hidden="true"
            />
          )}
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.cityAge}>
            {user.city}, {age}
          </p>
        </div>
      </div>

      {variant === 'skillPage' && user.aboutMe && (
        <p className={styles.aboutMe}>{user.aboutMe}</p>
      )}

      {variant === 'default' ? (
        <>
          <div className={styles.skillsSection}>
            <h4 className={styles.sectionTitle}>Может научить:</h4>
            <AdaptiveSkillsList skills={teachingSkills} maxVisible={2} />
          </div>

          <div className={styles.skillsSection}>
            <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
            <AdaptiveSkillsList skills={learningSkills} maxVisible={2} />
          </div>
        </>
      ) : (
        <>
          {teachingSkills.length > 0 && (
            <div className={styles.skillsSection}>
              <h4 className={styles.sectionTitle}>Может научить:</h4>
              <AdaptiveSkillsList skills={teachingSkills} maxVisible={2} />
            </div>
          )}
          {learningSkills.length > 0 && (
            <div className={styles.skillsSection}>
              <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
              <AdaptiveSkillsList skills={learningSkills} maxVisible={2} />
            </div>
          )}
        </>
      )}

      {variant !== 'skillPage' &&
        (!isProposed ? (
          <Button variant="primary" onClick={handleMoreClick}>
            Подробнее
          </Button>
        ) : (
          <Button variant="secondary">
            <ClockIcon className={styles.icon} aria-hidden="true" />
            Обмен предложен
          </Button>
        ))}
    </div>
  );
};
