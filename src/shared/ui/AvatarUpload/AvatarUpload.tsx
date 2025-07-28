import styles from './AvatarUpload.module.css';
import UserCircleSvg from '../../../assets/svg/icons/userCircle.svg?react';
import AddSvg from '../../../assets/svg/icons/addSvg.svg?react';
import clsx from 'clsx';
import React from 'react';

export interface AvatarUploadProps {
  value?: File | null;
  onChange: (file: File) => void;
  disabled?: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  let imageUrl = '';
  if (value) {
    imageUrl = URL.createObjectURL(value);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onChange(file);
    }
  };

  return (
    <div
      className={clsx(styles.avatarUpload, {
        [styles.disabled]: disabled,
      })}
      onClick={() => inputRef.current?.click()}
    >
      <div className={styles.avatarContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt="Аватар" className={styles.avatarImage} />
        ) : (
          <UserCircleSvg className={styles.avatarImage} />
        )}
        <AddSvg className={styles.addIcon} />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputRef}
        disabled={disabled}
      />
    </div>
  );
};

export default AvatarUpload;
