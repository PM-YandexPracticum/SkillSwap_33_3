import { useState, useEffect } from 'react';
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
import * as validation from '../../../shared/constants/validation';
import { SelectOption } from '@/shared/ui/SelectOption';

interface FormData {
  email: string;
  name: string;
  birthdate: Date | null;
  gender: string;
  city: string;
  about: string;
  image: string;
}

function Info() {
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

  const cities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Сочи',
    'Краснодар',
    'Кемерово',
    'Владивосток',
    'Красноярск',
    'Иркутск',
  ];
  const citiesOptions = cities.map((item) => ({
    label: item,
    value: item,
  }));

  const genders = [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
    { label: 'Не указан', value: 'unknown' },
  ];

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

  const validate = () => {
    let succeded = true;
    if (formData.email.length === 0) {
      setEmailError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
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
    }

    if (formData.birthdate === null) {
      setBirthdateError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    if (formData.city.length === 0) {
      setCityError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    return succeded;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (validate()) {
      try {
        await authApiClient.updateProfile(`${user.id}`, {
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
  useEffect(() => setEmailError(''), [formData.email]);
  useEffect(() => setNameError(''), [formData.name]);
  useEffect(() => setBirthdateError(''), [formData.birthdate]);
  useEffect(() => setCityError(''), [formData.city]);
  useEffect(() => setAboutError(''), [formData.about]);

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
          <CustomDatePicker
            label="Дата рождения"
            selected={formData.birthdate}
            onChange={(date) => handleChange('birthdate', date)}
            error={birthdateError}
          />
          <Select
            label="Пол"
            value={
              genders.find((item) => item.value === formData.gender)?.label
            }
          >
            {genders.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                onClick={(value: string) => handleChange('gender', value)}
              >
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>

        {/* Город */}
        <div className={styles.field}>
          <label>Город</label>
          <ComboInput
            defaultValue={formData.city}
            onChange={(val) => handleChange('city', val)}
            options={citiesOptions}
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
        <img className={styles.avatar} src={formData.image} alt="Аватарка" />
        <button type="button" className={styles.avatarEdit}>
          <GalleryEdit />
        </button>
      </div>
    </form>
  );
}

export const Component = Info;
