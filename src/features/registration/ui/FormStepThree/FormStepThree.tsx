import React, { useState } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { Select } from '@/shared/ui/Select';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { Button } from '@/shared/ui/Button';
import styles from './FormStepThree.module.css';
import { useSelector } from '@/app/store';
import { selectAllSkills } from '@/features/slices/skillsSlice';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFormSubmit({ title, category, subcategory, description, images });
  };

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
        required
      />

      <Select label="Категория навыка" value={category}>
        {skills.map((item) => (
          <div style={{ height: 32 }} onClick={() => setCategory(item.name)}>
            {item.name}
          </div>
        ))}
      </Select>

      <Select
        label="Подкатегория навыка"
        value={subcategory}
        disabled={!category}
      >
        {skills
          .find((item) => item.name === category)
          ?.subcategories.map((item) => (
            <div
              style={{ height: 32 }}
              onClick={() => setSubcategory(item.name)}
            >
              {item.name}
            </div>
          ))}
      </Select>

      <TextArea
        label="Описание"
        placeholder="Коротко опишите, чему можете научить"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ImageUpload value={images} onChange={setImages} />

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
