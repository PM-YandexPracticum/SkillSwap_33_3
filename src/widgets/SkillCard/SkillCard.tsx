import React, { useState } from 'react';
import type { TSkillInfo } from '../../shared/lib/types';
import { SkillInfo } from '../../shared/ui/SkillInfo';
import { Gallery } from '../Gallery';
import { Button } from '../../shared/ui/Button';

import likeIcon from '../../assets/svg/icons/like-hollow.svg';
import likedIcon from '../../assets/svg/icons/like.svg';
import shareIcon from '../../assets/svg/icons/share.svg';
import moreIcon from '../../assets/svg/icons/more-square.svg';

import styles from './SkillCard.module.css';

interface SkillCardProps {
  skill: TSkillInfo;
  onClick: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.actions}>
        <img
          src={liked ? likedIcon : likeIcon}
          alt="like"
          className={styles.icon}
          onClick={() => setLiked(!liked)}
        />
        <img src={shareIcon} alt="share" className={styles.icon} />
        <img src={moreIcon} alt="more" className={styles.icon} />
      </div>

      <div className={styles.body}>
        <div className={styles.left}>
          <SkillInfo skill={skill} />
          <Button
            className={styles.button}
            variant={pressed ? 'secondary' : 'primary'}
            onClick={() => {
              setPressed(!pressed);
              onClick();
            }}
          >
            Предложить обмен
          </Button>
        </div>

        <div className={styles.right}>
          <Gallery images={skill.images} />
        </div>
      </div>
    </div>
  );
};
