import React, { useState } from 'react';
import styles from './AvatarUpload.module.css';
import UserCircleSvg from '../../../assets/svg/icons/userCircle.svg?react';
import AddSvg from '../../../assets/svg/icons/addSvg.svg?react';

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
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onChange(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`${styles.avatarUpload} ${disabled ? styles.disabled : ''}`}
      onClick={() => inputRef.current?.click()}
    >
      <div className={styles.avatarContainer}>
        {imageUrl || value ? (
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
        disabled={disabled}
      />
    </div>
  );
};

export default AvatarUpload;
