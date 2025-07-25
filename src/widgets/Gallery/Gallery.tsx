import { useState } from 'react';
import clsx from 'clsx';
import ChevronIcon from '../../assets/svg/icons/chevron-right.svg';
import styles from './Gallery.module.css';

type GalleryProps = {
  images: string[];
};

export const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const thumbnails = images
    .map((src, index) => ({ src, index }))
    .filter(({ index }) => index !== currentIndex);

  const previewThumbs = thumbnails.slice(0, 2);
  const thirdThumb = thumbnails[2] ?? thumbnails[thumbnails.length - 1];

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <img
          src={images[currentIndex]}
          alt={`Изображение ${currentIndex + 1}`}
          className={styles.mainImage}
          width={324}
          height={324}
        />

        <div className={styles.controls}>
          <button
            className={clsx(styles.navButton, styles.rotate)}
            onClick={prev}
          >
            <img src={ChevronIcon} alt="Назад" className={styles.icon} />
          </button>

          <button className={clsx(styles.navButton)} onClick={next}>
            <img src={ChevronIcon} alt="Вперёд" className={styles.icon} />
          </button>
        </div>
      </div>

      <div className={styles.thumbnails}>
        {previewThumbs.map(({ src, index }) => (
          <div
            key={index}
            className={clsx(styles.thumbWrapper, {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={src}
              className={styles.thumb}
              alt={`Превью ${index + 1}`}
            />
          </div>
        ))}

        {thirdThumb && (
          <div
            key={thirdThumb.index}
            className={styles.thumbWrapper}
            onClick={() => setCurrentIndex(thirdThumb.index)}
          >
            <img
              src={thirdThumb.src}
              className={styles.thumb}
              alt={`Превью ${thirdThumb.index + 1}`}
            />
            <div className={styles.moreOverlay}>
              <span className={styles.moreText}>+3</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
