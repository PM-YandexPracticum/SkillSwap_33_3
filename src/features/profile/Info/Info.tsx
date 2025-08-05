import { useState, useEffect, useCallback } from 'react';
import styles from './Info.module.css';
import { Select } from '../../../shared/ui/Select';
import { ComboInput } from '../../../shared/ui/ComboInput';
import { TextArea } from '../../../shared/ui/TextArea/TextArea';
import { Button } from '../../../shared/ui/Button';
import { FormInput } from '../../../shared/ui/FormInput/FormInput';
import EditIcon from '../../../assets/svg/icons/edit.svg?react';
import GalleryEdit from '../../../assets/svg/icons/gallery-edit.svg?react';
import ProfileAvatar from '../../../assets/img/avatars/avatar-maria-profile.jpg';
import { CustomDatePicker } from '../../../shared/ui/CustomDatePicker/CustomDatePicker';
import { useSelector } from '@/app/store';
import { selectAuthUser } from '@/features/slices/authSlice';
import { updateProfile } from '@/api/authClient';
import * as validation from '../../../shared/constants/validation';

interface FormData {
  email: string;
  name: string;
  birthdate: Date | null;
  gender: string;
  city: string;
  about: string;
}

const initialData: FormData = {
  email: 'Mariia@gmail.com',
  name: 'Мария',
  birthdate: new Date(1995, 9, 28), // 28.10.1995
  gender: 'Женский',
  city: 'Москва',
  about:
    'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем-то интересным!',
};

export default function Info() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [edited, setEdited] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const user = useSelector(selectAuthUser);

  const handleChange = (key: keyof FormData, value: string | Date | null) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    setEdited(JSON.stringify(updated) !== JSON.stringify(initialData));
  };

  const validator = () => {
    let succeded = true;
    if (formData.email.length === 0) {
      setEmailError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else {
      setEmailError('');
    }

    if (formData.name.length === 0) {
      setNameError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else if (
      formData.name.length < validation.shortFieldLengthMin ||
      formData.name.length > validation.shortFieldLengthMax
    ) {
      setNameError(validation.eMessageFieldMustBeShort);
      succeded = false;
    } else {
      setNameError('');
    }

    if (formData.birthdate === null) {
      setBirthdateError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else {
      setBirthdateError('');
    }

    if (formData.city.length === 0) {
      setCityError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else {
      setCityError('');
    }

    if (formData.about.length > validation.longFieldLengthMax) {
      setAboutError(validation.eMessageFieldMustBeLong);
      succeded = false;
    } else {
      setAboutError('');
    }

    return succeded;
  };
  const validate = useCallback(validator, [formData]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (validator()) {
      try {
        await updateProfile(user.id, {
          name: formData.name,
          city: formData.city,
          gender: formData.gender,
          birthDate: formData.birthdate?.toISOString() ?? '',
        });

        setEdited(false);
      } catch (error) {
        console.error('Ошибка при обновлении профиля', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.form}>
        {/* Email */}
        <div className={styles.field}>
          <FormInput
            title="Почта"
            error={emailError}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            svg={<EditIcon className={styles.editIcon} />}
            maxLength={validation.shortFieldLengthMax}
          />
          <span className={styles.changePassword}>Изменить пароль</span>
        </div>

        {/* Имя */}
        <div className={styles.field}>
          <FormInput
            title="Имя"
            error={nameError}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            svg={<EditIcon className={styles.editIcon} />}
            maxLength={validation.shortFieldLengthMax}
          />
        </div>

        {/* Дата рождения + Пол */}
        <div className={styles.row}>
          <div className={styles.halfField}>
            <label>Дата рождения</label>
            <CustomDatePicker
              selected={formData.birthdate}
              onChange={(date) => handleChange('birthdate', date)}
              error={birthdateError}
            />
          </div>
          <div className={styles.halfField}>
            <label>Пол</label>
            <Select value={formData.gender}>
              {['Женский', 'Мужской'].map((option) => (
                <div
                  key={option}
                  role="option"
                  className={styles.selectOption}
                  onClick={() => handleChange('gender', option)}
                >
                  {option}
                </div>
              ))}
            </Select>
          </div>
        </div>

        {/* Город */}
        <div className={styles.field}>
          <label>Город</label>
          <ComboInput
            defaultValue={formData.city}
            onChange={(val) => handleChange('city', val)}
            options={[
              { label: 'Москва', value: 'moscow' },
              { label: 'Санкт-Петербург', value: 'spb' },
              { label: 'Новосибирск', value: 'nsk' },
            ]}
            error={cityError}
          />
        </div>

        {/* О себе */}
        <div className={styles.field}>
          <label>О себе</label>
          <div className={styles.inputWithIcon}>
            <TextArea
              value={formData.about}
              onChange={(e) => handleChange('about', e.target.value)}
              svg={<EditIcon className={styles.editIcon} />}
              error={aboutError}
              maxLength={validation.longFieldLengthMax}
            />
          </div>
        </div>

        <Button type="submit" disabled={!edited}>
          Сохранить
        </Button>
      </div>

      {/* Аватар */}
      <div className={styles.avatarSection}>
        <img className={styles.avatar} src={ProfileAvatar} alt="Аватарка" />
        <button type="button" className={styles.avatarEdit}>
          <GalleryEdit />
        </button>
      </div>
    </form>
  );
}
