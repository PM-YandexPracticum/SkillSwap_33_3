import { Link } from 'react-router-dom';
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
        <Link
          to="/feedback"
          className={`${styles.button} ${styles.buttonOutline}`}
        >
          Сообщить об ошибке
        </Link>
        <Link to="/" className={`${styles.button} ${styles.buttonPrimary}`}>
          На главную
        </Link>
      </div>
    </div>
  );
}
