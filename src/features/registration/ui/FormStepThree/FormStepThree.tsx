import React, { useState, useEffect, useCallback } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { Select } from '@/shared/ui/Select';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { Button } from '@/shared/ui/Button';
import styles from './FormStepThree.module.css';
import { useSelector } from '@/app/store';
import { selectAllSkills } from '@/features/slices/skillsSlice';
import * as validation from '@/shared/constants/validation';
import { SelectOption } from '@/shared/ui/SelectOption';

interface FormStepThreeData {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  images: File[];
}

interface FormStepThreeProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit: (data: FormStepThreeData) => void;
  onReset?: () => void;
}

export const FormStepThree: React.FC<FormStepThreeProps> = ({
  onFormSubmit,
  onReset,
  ...rest
}) => {
  const skills = useSelector(selectAllSkills);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const [skillError, setSkillError] = useState('');
  const [skillDescError, setSkillDescError] = useState('');
  const [imageError, setImageError] = useState('');

  const validator = () => {
    let succeded = true;

    if (title.length === 0) {
      setSkillError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    } else if (
      title.length < validation.shortFieldLengthMin ||
      title.length > validation.shortFieldLengthMax
    ) {
      setSkillError(validation.eMessageFieldMustBeShort);
      succeded = false;
    } else {
      setSkillError('');
    }

    if (description.length > validation.longFieldLengthMax) {
      setSkillDescError(validation.eMessageFieldMustBeLong);
      succeded = false;
    } else {
      setSkillDescError('');
    }

    const isLargeFile = (image: File) => {
      console.log(image);
      return image.size > validation.imageSizeLimit;
    };

    if (images.some(isLargeFile)) {
      setImageError(validation.eMessageImageMustBeSmall);
      succeded = false;
    } else {
      setImageError('');
    }

    return succeded;
  };
  const validate = useCallback(validator, [title, description, images]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator()) {
      onFormSubmit({ title, category, subcategory, description, images });
    }
  };

  const handleReset = () => {
    setTitle('');
    setCategory('');
    setSubcategory('');
    setDescription('');
    setImages([]);
    setSkillError('');
    setSkillDescError('');
    setImageError('');
    onReset?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={styles.form}
      {...rest}
    >
      <FormInput
        title="Название навыка"
        placeholder="Введите название вашего навыка"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={skillError}
        maxLength={validation.shortFieldLengthMax}
      />

      <Select label="Категория навыка" value={category} disabled={!title}>
        {skills.map((item) => (
          <SelectOption key={item.name} value={item.name} onClick={setCategory}>
            {item.name}
          </SelectOption>
        ))}
      </Select>

      <Select
        label="Подкатегория навыка"
        value={subcategory}
        disabled={!category || !title}
      >
        {skills
          .find((item) => item.name === category)
          ?.subcategories.map((item) => (
            <SelectOption
              key={item.name}
              value={item.name}
              onClick={setSubcategory}
            >
              {item.name}
            </SelectOption>
          ))}
      </Select>

      <TextArea
        label="Описание"
        placeholder="Коротко опишите, чему можете научить"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={skillDescError}
        maxLength={validation.longFieldLengthMax}
        disabled={!title}
      />

      <ImageUpload
        value={images}
        onChange={setImages}
        error={imageError}
        disabled={!title}
      />

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
