import React, { useState, useEffect } from 'react';
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
  onFormSubmit: (data: FormStepThreeData | null) => void;
  onReset?: () => void;
}

const FormStepThree: React.FC<FormStepThreeProps> = ({
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

  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [subcategoryError, setSubcategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [imagesError, setImagesError] = useState('');

  const validate = () => {
    if (title.length === 0) return true;

    let succeded = true;
    if (
      title.length < validation.shortFieldLengthMin ||
      title.length > validation.shortFieldLengthMax
    ) {
      setTitleError(validation.eMessageFieldMustBeShort);
      succeded = false;
    }

    if (!category) {
      setCategoryError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    if (!subcategory) {
      setSubcategoryError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    if (description.length > validation.longFieldLengthMax) {
      setDescriptionError(validation.eMessageFieldMustBeLong);
      succeded = false;
    }

    const isLargeFile = (image: File) => {
      return image.size > validation.imageSizeLimit;
    };

    if (images.some(isLargeFile)) {
      setImagesError(validation.eMessageImageMustBeSmall);
      succeded = false;
    }

    return succeded;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    if (!title) onFormSubmit(null);
    onFormSubmit({ title, category, subcategory, description, images });
  };

  useEffect(() => setTitleError(''), [title]);
  useEffect(() => setCategoryError(''), [category]);
  useEffect(() => setSubcategoryError(''), [subcategory]);
  useEffect(() => setDescriptionError(''), [description]);
  useEffect(() => setImagesError(''), [images]);

  const handleReset = () => {
    setTitle('');
    setCategory('');
    setSubcategory('');
    setDescription('');
    setImages([]);
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
        error={titleError}
        maxLength={validation.shortFieldLengthMax}
      />

      <Select
        label="Категория навыка"
        value={category}
        error={categoryError}
        disabled={!title}
      >
        {skills.map((item) => (
          <SelectOption key={item.name} value={item.name} onClick={setCategory}>
            {item.name}
          </SelectOption>
        ))}
      </Select>

      <Select
        label="Подкатегория навыка"
        value={subcategory}
        error={subcategoryError}
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
        error={descriptionError}
        maxLength={validation.longFieldLengthMax}
        disabled={!title}
      />

      <ImageUpload
        value={images}
        onChange={setImages}
        error={imagesError}
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

export default FormStepThree;
