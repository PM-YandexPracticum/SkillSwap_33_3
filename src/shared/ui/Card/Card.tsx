import clsx from 'clsx';
import type { IUser } from '../../lib/types';
import { CardSkill } from '../CardSkill';
import styles from './Card.module.css';
import { Button } from '../Button';

type CardProps = {
  user: IUser;
  liked: boolean;
  onLikeClick: () => void;
  onMoreClick: () => void;
  isProposed: boolean;
  variant?: 'primary' | 'secondary';
};

export const Card: React.FC<CardProps> = ({
  user,
  liked,
  onLikeClick,
  onMoreClick,
  isProposed,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <img
          className={styles.avatar}
          src={`/src/assets/img/avatars/${user.avatar}`}
          alt={user.name}
        />
        <div className={styles.infoText}>
          <svg
            className={clsx(styles.likeIcon, { [styles.likeActive]: liked })}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onLikeClick}
          >
            <path
              d="M7.95 4C5.21619 4 3 6.1521 3 8.80682C3 13.6136 8.85 17.9835 12 19C15.15 17.9835 21 13.6136 21 8.80682C21 6.1521 18.7838 4 16.05 4C14.3759 4 12.8958 4.80707 12 6.04238C11.1042 4.80707 9.62414 4 7.95 4Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.cityAge}>
            {user.city}, {user.ageString}
          </p>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h4 className={styles.sectionTitle}>Может научить:</h4>
        <div className={styles.skillsRow}>
          {user.teachingSkills.slice(0, 2).map((skill, index) => (
            <CardSkill key={index} skill={skill} />
          ))}

          {user.teachingSkills.length - 2 > 0 && (
            <span className={styles.morePill}>
              +{user.teachingSkills.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
        <div className={styles.skillsRow}>
          {user.learningSkills.slice(0, 2).map((skill, index) => (
            <CardSkill key={index} skill={skill} />
          ))}

          {user.learningSkills.length - 2 > 0 && (
            <span className={styles.morePill}>
              +{user.learningSkills.length - 2}
            </span>
          )}
        </div>
      </div>

      {!isProposed ? (
        <Button variant="primary" onClick={onMoreClick}>
          Подробнее
        </Button>
      ) : (
        <Button
          variant="secondary"
          className={clsx(styles.detailsButton, styles.proposeButton)}
          disabled
        >
          <img
            src="/src/assets/svg/icons/clock.svg"
            alt="clock icon"
            className={styles.icon}
          />
          Обмен предложен
        </Button>
      )}
    </div>
  );
};
