import { useState } from 'react';
import styles from './Info.module.css';
import { Select } from '../../../shared/ui/Select';
import { ComboInput } from '../../../shared/ui/ComboInput';
import { TextArea } from '../../../shared/ui/TextArea/TextArea';
import { Button } from '../../../shared/ui/Button';
import { FormInput } from '../../../shared/ui/FormInput/FormInput';
import EditIcon from '../../../assets/svg/icons/edit.svg?react';
import GalleryEdit from '../../../assets/svg/icons/gallery-edit.svg?react';
import { CustomDatePicker } from '../../../shared/ui/CustomDatePicker/CustomDatePicker';
import { useSelector } from '@/app/store';
import { selectAuthUser } from '@/features/slices/authSlice';
import { authApiClient } from '@/api/authClient';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from '@/shared/hooks/useUpdateEffect';

interface FormData {
  email: string;
  name: string;
  birthdate: Date | null;
  gender: string;
  city: string;
  about: string;
  image: string;
}

export default function Info() {
  const navigate = useNavigate();
  const initialData: FormData = {
    email: '',
    name: '',
    birthdate: new Date(''),
    gender: '',
    city: '',
    about: '',
    image: '',
  };

  const user = useSelector(selectAuthUser);

  const [formData, setFormData] = useState<FormData>(initialData);
  const [edited, setEdited] = useState(false);

  const handleChange = (key: keyof FormData, value: string | Date | null) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    setEdited(JSON.stringify(updated) !== JSON.stringify(initialData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await authApiClient.updateProfile(user.id, {
        name: formData.name,
        city: formData.city,
        gender: formData.gender,
        birthDate: formData.birthdate?.toISOString() ?? '',
      });

      setEdited(false);
    } catch (error) {
      console.error('Ошибка при обновлении профиля', error);
    }
  };

  useUpdateEffect(() => {
    if (!user) navigate('/');
    else
      setFormData((state) => ({
        ...state,
        email: user?.email || '',
        name: user?.name || '',
        birthdate: new Date(user?.birthDate || ''),
        gender: user?.gender || '',
        city: user?.city || '',
        about: user?.aboutMe || '',
        image: user?.avatar || '',
      }));
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.form}>
        {/* Email */}
        <div className={styles.field}>
          <FormInput
            title="Почта"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            svg={<EditIcon className={styles.editIcon} />}
          />
          <span className={styles.changePassword}>Изменить пароль</span>
        </div>

        {/* Имя */}
        <div className={styles.field}>
          <FormInput
            title="Имя"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            svg={<EditIcon className={styles.editIcon} />}
          />
        </div>

        {/* Дата рождения + Пол */}
        <div className={styles.row}>
          <CustomDatePicker
            label="Дата рождения"
            selected={formData.birthdate}
            onChange={(date) => handleChange('birthdate', date)}
          />
          <Select label="Пол" value={formData.gender}>
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
            />
          </div>
        </div>

        <Button type="submit" disabled={!edited}>
          Сохранить
        </Button>
      </div>

      {/* Аватар */}
      <div className={styles.avatarSection}>
        <img className={styles.avatar} src={formData.image} alt="Аватарка" />
        <button type="button" className={styles.avatarEdit}>
          <GalleryEdit />
        </button>
      </div>
    </form>
  );
}
