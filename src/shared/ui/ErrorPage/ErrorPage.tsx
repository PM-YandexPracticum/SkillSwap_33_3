import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import styles from './ErrorPage.module.css';

interface ErrorPageProps {
  image: string;
  title: string;
  description: string;
  className?: string;
  imageClassName?: string;
}

export function ErrorPage({
  image,
  title,
  description,
  className,
  imageClassName,
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className={`${styles.notFoundContainer} ${className ?? ''}`}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={`${styles.image} ${imageClassName ?? ''}`}
        />
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>

      <div className={styles.buttons}>
        <Button variant="secondary" onClick={() => navigate('/feedback')}>
          Сообщить об ошибке
        </Button>
        <Button variant="primary" onClick={() => navigate('/')}>
          На главную
        </Button>
      </div>
    </div>
  );
}
