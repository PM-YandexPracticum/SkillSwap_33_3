import React, { useState } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { Select } from '@/shared/ui/Select';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { Button } from '@/shared/ui/Button';
import styles from './FormStepThree.module.css';
import { useSelector } from '@/app/store';
import { selectAllSkills } from '@/features/slices/skillsSlice';
import { Modal } from '@/shared/ui/Modal';
import { SkillInfo } from '@/shared/ui/SkillInfo';
import type { TSkillInfo } from '@/shared/lib/types';
import { Gallery } from '@/widgets/Gallery';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../../../assets/svg/icons/edit.svg?react';

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
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSkillInfo: TSkillInfo = {
      skillName: title,
      category: category,
      subcategory: subcategory,
      description: description,
      images: images.map((img) => URL.createObjectURL(img)),
      id: Date.now(),
    };

    setSkillInfo(newSkillInfo);
    onFormSubmit({ title, category, subcategory, description, images });
    openModal();
  };

  const handleReset = () => {
    setTitle('');
    setCategory('');
    setSubcategory('');
    setDescription('');
    setImages([]);
    onReset?.();
  };
  const [skillInfo, setSkillInfo] = useState<TSkillInfo>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <Button variant="primary" type="submit" onClick={openModal}>
          Продолжить
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className={styles.header}>
            <h2 className={styles.title}>Ваше предложение</h2>
            <p className={styles.description}>
              {' '}
              Пожалуйста, проверьте и подтвердите правильность данных
            </p>
          </div>

          {skillInfo && (
            <>
              <div className={styles.content}>
                <div className={styles.descriptionContainer}>
                  <SkillInfo skill={skillInfo} />
                  <div className={styles.buttonsContainer}>
                    <Button variant="secondary" onClick={closeModal}>
                      Редактировать
                      <EditIcon />
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/')}>
                      Готово
                    </Button>
                  </div>
                </div>
                <Gallery images={skillInfo.images} />
              </div>
            </>
          )}
        </Modal>
      )}
    </form>
  );
};
