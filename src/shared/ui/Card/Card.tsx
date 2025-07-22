import type { TeachingSkill, LearningSkill } from '../../lib/types';
import { getCategoryColor } from '../CardSkill/categories';
import styles from './Card.module.css';
export type User = {
  id: string;
  name: string;
  city: string;
  gender: string;
  birthDate: string;
  aboutMe?: string;
  teachingSkills: TeachingSkill[];
  learningSkills: LearningSkill[];
  avatar: string;
};

type CardProps = {
  user: User;
  ageText: string;
  liked: boolean;
  onLikeClick: () => void;
  onMoreClick: () => void;
  isProposed: boolean;
};

export const Card: React.FC<CardProps> = ({
  user,
  ageText,
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
          <img
            src={
              liked
                ? '/src/assets/svg/icons/like-hollow.svg'
                : '/src/assets/svg/icons/like.svg'
            }
            alt="Иконка лайка"
            className={styles.likeIcon}
            onClick={onLikeClick}
          />
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.cityAge}>
            {user.city}, {ageText}
          </p>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h4 className={styles.sectionTitle}>Может научить:</h4>
        <div className={styles.skillsRow}>
          {user.teachingSkills.slice(0, 2).map((skill, index) => {
            const category = getCategoryColor(skill.category);

            return (
              <span
                key={index}
                className={`${styles.skillPill} ${styles[category]}`}
              >
                {skill.skillName}
              </span>
            );
          })}

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
          {user.learningSkills.slice(0, 2).map((skill, index) => {
            const category = getCategoryColor(skill.category);

            return (
              <span
                key={index}
                className={`${styles.skillPill} ${styles[category]}`}
              >
                {skill.category}
              </span>
            );
          })}
          {user.learningSkills.length - 2 > 0 && (
            <span className={styles.morePill}>
              +{user.learningSkills.length - 2}
            </span>
          )}
        </div>
      </div>

      {!isProposed ? (
        <button className={styles.detailsButton} onClick={onMoreClick}>
          Подробнее
        </button>
      ) : (
        <button
          className={`${styles.detailsButton} ${styles.proposeButton}`}
          disabled
        >
          <img
            src="/src/assets/svg/icons/clock.svg"
            alt="clock icon"
            className={styles.icon}
          />
          Обмен предложен
        </button>
      )}
    </div>
  );
};
