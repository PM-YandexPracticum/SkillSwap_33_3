import React, { useState } from 'react';
import type { TSkillInfo } from '../../shared/lib/types';
import { SkillInfo } from '../../shared/ui/SkillInfo';
import { Gallery } from '../Gallery';
import { Button } from '../../shared/ui/Button';

import LikeIcon from '../../assets/svg/icons/like.svg?react';
import LikeHollowIcon from '../../assets/svg/icons/like-hollow.svg?react';
import ShareIcon from '../../assets/svg/icons/share.svg?react';
import MoreIcon from '../../assets/svg/icons/more-square.svg?react';
import Notification from '../../assets/svg/icons/notificatiom.svg?react';

import styles from './SkillCard.module.css';
import { selectIsAuth } from '@/features/slices/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/Modal';

interface SkillCardProps {
  skill: TSkillInfo;
  onClick: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const handleExchange = () => {
    if (!isAuth) {
      navigate('/register');
      return;
    }

    setPressed(!pressed);
    onClick();
    setShowModal(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.actions} aria-label="Действия над карточкой">
        <button
          type="button"
          className={styles.icon}
          aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <LikeIcon aria-hidden="true" />
          ) : (
            <LikeHollowIcon aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className={styles.icon}
          aria-label="Поделиться навыком"
        >
          <ShareIcon aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.icon}
          aria-label="Дополнительные действия"
        >
          <MoreIcon aria-hidden="true" />
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.left}>
          <SkillInfo skill={skill} />
          <Button
            className={styles.button}
            variant={pressed ? 'secondary' : 'primary'}
            aria-label="Предложить обмен"
            aria-pressed={pressed}
            onClick={handleExchange}
          >
            Предложить обмен
          </Button>
        </div>

        <div className={styles.right}>
          <Gallery images={skill.images} />
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.modal}>
          <div className={styles.notification}>
            {' '}
            <Notification />{' '}
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Вы предложили обмен</h2>
            <p className={styles.description}>
              Теперь дождитесь подтверждения. Вам придёт уведомление
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <Button variant="primary" onClick={() => navigate('/')}>
              Готово
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
