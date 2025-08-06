import { useDropzone } from 'react-dropzone';
import styles from './ImageUpload.module.css';
import GalleryEdit from '../../../assets/svg/icons/galleryEdit.svg?react';
import GalleryAdd from '../../../assets/svg/icons/galleryAdd.svg?react';
import type { Accept } from 'react-dropzone';
import clsx from 'clsx';
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';

export interface ImageUploadProps {
  value?: File[] | null; //— текущие выбранные изображения
  onChange: (files: File[]) => void; //— callback при добавлении/удалении изображений
  accept?: Accept; // MIME-типы (по умолчанию "image/*")
  label?: string; //— текст-подсказка (" Перетащите или выберите изображения навыка")
  disabled?: boolean;
  error?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  accept = { 'image/*': [] },
  label = 'Перетащите или выберите изображения навыка',
  disabled = false,
  error,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    disabled,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });
  const rootProps = getRootProps();

  return (
    <div
      {...getRootProps()}
      className={clsx(styles.dropzone, {
        [styles.dragOver]: isDragActive && !disabled,
      })}
    >
      <input {...getInputProps()} />
      <div className={styles.content}>
        {!value || value.length === 0 ? (
          <span className={styles.label}>{label}</span>
        ) : null}
        <button
          type="button"
          className={clsx(styles.uploadButton, {
            [styles.disabled]: disabled,
          })}
          disabled={disabled}
          onClick={(event) => {
            if (rootProps.onMouseDown) {
              rootProps.onMouseDown(event);
            }
          }}
        >
          {value && value.length > 0 ? (
            <div className={styles.success}>
              <GalleryEdit />
              <span>Файлы загружены</span>
            </div>
          ) : (
            <>
              <GalleryAdd />
              <span className={styles.description}>Выбрать изображения</span>
            </>
          )}
        </button>
      </div>
      <ValidationMessage error={error} />
    </div>
  );
};

export default ImageUpload;
