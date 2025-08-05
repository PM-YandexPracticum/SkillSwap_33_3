import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';
import { Select } from '@/shared/ui/Select';
import { CustomDatePicker } from '@/shared/ui/CustomDatePicker/CustomDatePicker';

import styles from './FormStepTwo.module.css';
import { AvatarUpload } from '@/shared/ui/AvatarUpload';
import { useSelector } from '@/app/store';
import { selectAllSkills } from '@/features/slices/skillsSlice';
import { Checkbox } from '@/shared/ui/Checkbox';
import { ComboInput } from '@/shared/ui/ComboInput';
import * as validation from '@/shared/constants/validation';
import { SelectOption } from '@/shared/ui/SelectOption';

interface FormStepTwoData {
  avatar: File | null;
  name: string;
  birthDate: Date | null;
  gender: string;
  city: string;
  categories: string[];
  subcategories: string[];
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
  const skills = useSelector(selectAllSkills);
  const [nameError, setNameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [cityError, setCityError] = useState('');

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

  const [avatar, setAvatar] = useState<File | null>(
    defaultValues?.avatar || null
  );
  const [name, setName] = useState(defaultValues?.name || '');
  const [birthDate, setBirthDate] = useState<Date | null>(
    defaultValues?.birthDate || null
  );

  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [genderLabel, setGenderLabel] = useState(
    genders.find((item) => item.value === defaultValues?.gender)?.label
  );

  const [city, setCity] = useState(defaultValues?.city || '');
  const [categories, setCategories] = useState<string[]>(
    defaultValues?.categories || []
  );

  const [subcategories, setSubcategories] = useState<string[]>(
    defaultValues?.subcategories || []
  );
  const initialValueVisibleSubs: { name: string; items?: string[] }[] = [];
  const visibleSubategories = skills.reduce((acc, item) => {
    if (!categories.includes(item.name)) return acc;
    return [...acc, ...item.subcategories];
  }, initialValueVisibleSubs);

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) setCategories((state) => [...state, value]);
    else setCategories((state) => state.filter((item) => item !== value));
  };

  const handleSubcategoriesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    if (checked) setSubcategories((state) => [...state, value]);
    else setSubcategories((state) => state.filter((item) => item !== value));
  };

  const validator = () => {
    let succeded = true;

    if (name.length === 0) {
      setNameError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else if (
      name.length < validation.shortFieldLengthMin ||
      name.length > validation.shortFieldLengthMax
    ) {
      setNameError(validation.eMessageFieldMustBeShort);
      succeded = false;
    } else {
      setNameError('');
    }

    if (birthDate === null) {
      setBirthdateError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else {
      setBirthdateError('');
    }

    if (city.length === 0) {
      setCityError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else {
      setCityError('');
    }

    return succeded;
  };

  const validate = useCallback(validator, [name, birthDate, city]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator()) {
      onFormSubmit({
        avatar,
        name,
        birthDate,
        gender,
        city,
        categories,
        subcategories,
      });
    }
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError('');
    setBirthdateError('');
    setCityError('');
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
        maxLength={validation.shortFieldLengthMax}
        error={nameError}
      />

      <div className={styles.row}>
        <div className={styles.half}>
          <CustomDatePicker
            label="Дата рождения"
            selected={birthDate}
            onChange={setBirthDate}
            error={birthdateError}
          />
        </div>
        <div className={styles.half}>
          <Select label="Пол" value={genderLabel}>
            {genders.map((item) => (
              <SelectOption
                key={item.value}
                value={item.value}
                onClick={(value: string) => {
                  setGender(value);
                  setGenderLabel(item.label);
                }}
              >
                {item.label}
              </SelectOption>
            ))}
          </Select>
        </div>
      </div>

      <ComboInput
        label="Город"
        placeholder="Не указан"
        options={citiesOptions}
        onChange={setCity}
        error={cityError}
      />

      <Select label="Категория навыка, которому хотите научиться">
        {skills.map((item) => (
          <div style={{ paddingLeft: 12 }}>
            <Checkbox
              key={item.name}
              value={item.name}
              onChange={handleCategoriesChange}
            >
              {item.name}
            </Checkbox>
          </div>
        ))}
      </Select>

      <Select
        label="Подкатегория навыка, которому хотите научиться"
        disabled={!categories[0]}
      >
        {visibleSubategories.map((item) => (
          <div style={{ paddingLeft: 12 }}>
            <Checkbox
              key={item.name}
              value={item.name}
              onChange={handleSubcategoriesChange}
            >
              {item.name}
            </Checkbox>
          </div>
        ))}
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
