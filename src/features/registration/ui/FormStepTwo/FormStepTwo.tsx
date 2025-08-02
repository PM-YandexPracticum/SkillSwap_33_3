import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';
import { Select } from '@/shared/ui/Select';
import { CustomDatePicker } from '@/shared/ui/CustomDatePicker/CustomDatePicker';

import styles from './FormStepTwo.module.css';
import { AvatarUpload } from '@/shared/ui/AvatarUpload';

interface FormStepTwoData {
  avatar: File | null;
  name: string;
  birthDate: Date | null;
  gender: string;
  city: string;
  category: string;
  subcategory: string;
}

interface FormStepTwoProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit: (data: Partial<FormStepTwoData>) => void;
  onReset?: () => void;
  defaultValues?: Partial<FormStepTwoData>;
}

export const FormStepTwo: React.FC<FormStepTwoProps> = ({
  onFormSubmit,
  onReset,
  defaultValues,
  ...rest
}) => {
  const [avatar, setAvatar] = useState<File | null>(
    defaultValues?.avatar || null
  );
  const [name, setName] = useState(defaultValues?.name || '');
  const [birthDate, setBirthDate] = useState<Date | null>(
    defaultValues?.birthDate || null
  );

  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [genderLabel, setGenderLabel] = useState(() => {
    switch (defaultValues?.gender) {
      case 'male':
        return 'Мужской';
      case 'female':
        return 'Женский';
      default:
        return 'Не указан';
    }
  });

  const [city, setCity] = useState(defaultValues?.city || '');
  const [cityLabel, setCityLabel] = useState(() => {
    switch (defaultValues?.city) {
      case 'moscow':
        return 'Москва';
      case 'spb':
        return 'Санкт-Петербург';
      default:
        return 'Не указан';
    }
  });

  const [category, setCategory] = useState(defaultValues?.category || '');
  const [categoryLabel, setCategoryLabel] = useState(() => {
    switch (defaultValues?.category) {
      case 'design':
        return 'Дизайн';
      case 'development':
        return 'Разработка';
      default:
        return '';
    }
  });

  const [subcategory, setSubcategory] = useState(
    defaultValues?.subcategory || ''
  );
  const [subcategoryLabel, setSubcategoryLabel] = useState(() => {
    switch (defaultValues?.subcategory) {
      case 'ux':
        return 'UX-дизайн';
      case 'frontend':
        return 'Frontend';
      default:
        return '';
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit({
      avatar,
      name,
      birthDate,
      gender,
      city,
      category,
      subcategory,
    });
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onReset?.();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onReset={handleReset}
      {...rest}
    >
      <AvatarUpload value={avatar} onChange={setAvatar} />

      <FormInput
        title="Имя"
        placeholder="Введите ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={styles.row}>
        <div className={styles.half}>
          <CustomDatePicker
            label="Дата рождения"
            selected={birthDate}
            onChange={setBirthDate}
          />
        </div>
        <div className={styles.half}>
          <Select label="Пол" value={genderLabel}>
            <div
              onClick={() => {
                setGender('male');
                setGenderLabel('Мужской');
              }}
            >
              Мужской
            </div>
            <div
              onClick={() => {
                setGender('female');
                setGenderLabel('Женский');
              }}
            >
              Женский
            </div>
            <div
              onClick={() => {
                setGender('');
                setGenderLabel('Не указан');
              }}
            >
              Не указан
            </div>
          </Select>
        </div>
      </div>

      <Select label="Город" value={cityLabel}>
        <div
          onClick={() => {
            setCity('moscow');
            setCityLabel('Москва');
          }}
        >
          Москва
        </div>
        <div
          onClick={() => {
            setCity('spb');
            setCityLabel('Санкт-Петербург');
          }}
        >
          Санкт-Петербург
        </div>
      </Select>

      <Select
        label="Категория навыка, которому хотите научиться"
        value={categoryLabel}
      >
        <div
          onClick={() => {
            setCategory('design');
            setCategoryLabel('Дизайн');
          }}
        >
          Дизайн
        </div>
        <div
          onClick={() => {
            setCategory('development');
            setCategoryLabel('Разработка');
          }}
        >
          Разработка
        </div>
      </Select>

      <Select
        label="Подкатегория навыка, которому хотите научиться"
        value={subcategoryLabel}
      >
        <div
          onClick={() => {
            setSubcategory('ux');
            setSubcategoryLabel('UX-дизайн');
          }}
        >
          UX-дизайн
        </div>
        <div
          onClick={() => {
            setSubcategory('frontend');
            setSubcategoryLabel('Frontend');
          }}
        >
          Frontend
        </div>
      </Select>

      <div className={styles.actions}>
        <Button variant="secondary" type="reset">
          Назад
        </Button>
        <Button variant="primary" type="submit">
          Продолжить
        </Button>
      </div>
    </form>
  );
};
