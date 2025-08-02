import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import logoIcon from '@/assets/svg/logo.svg';
import { Button } from '@/shared/ui/Button';
import CrossIcon from '@/assets/svg/icons/cross.svg?react';
import { FormStepOne } from '@/features/registration/ui/FormStepOne';
import { FormStepTwo } from '@/features/registration/ui/FormStepTwo';
import { FormStepThree } from '@/features/registration/ui/FormStepThree';
import { WelcomeSection } from '@/features/registration/ui/WelcomeSection';
import iconStep1 from '@/assets/svg/light-bulb.svg';
import iconStep2 from '@/assets/svg/user-info.svg';
import iconStep3 from '@/assets/svg/school-board.svg';
import { useDispatch } from '@/app/store';
import { fetchSkills } from '@/features/slices/skillsSlice';

export interface RegistrationData {
  email: string;
  password: string;
  avatar: File | null;
  name: string;
  birthDate: Date | null;
  gender: string;
  city: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  images: File[];
}

export const Registration: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(fetchSkills());

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});

  const handleNext = (data: Partial<RegistrationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setFormData((prev) => {
      const updated = { ...prev };

      if (step === 2) {
        delete updated.name;
        delete updated.birthDate;
        delete updated.gender;
        delete updated.city;
        delete updated.category;
        delete updated.subcategory;
      } else if (step === 3) {
        delete updated.title;
        delete updated.description;
        delete updated.images;
      }

      return updated;
    });

    setStep((prev) => Math.max(1, prev - 1));
  };
  const handleClose = () => {
    navigate('/');
  };

  const rightSideContent = () => {
    switch (step) {
      case 1:
        return (
          <WelcomeSection
            icon={iconStep1}
            title="Добро пожаловать в SkillSwap!"
            description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        );
      case 2:
        return (
          <WelcomeSection
            icon={iconStep2}
            title="Расскажите немного о себе"
            description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
          />
        );
      case 3:
        return (
          <WelcomeSection
            icon={iconStep3}
            title="Укажите, чем вы готовы поделиться"
            description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Шапка */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src={logoIcon} alt="SkillSwap" className={styles.logoIcon} />
          <span className={styles.logoText}>SkillSwap</span>
        </Link>
        <div className={styles.closeButtonContainer}>
          <Button variant="tertiary" onClick={handleClose} type="button">
            <span className={styles.closeButtonText}>
              Закрыть
              <CrossIcon width="24" height="24" />
            </span>
          </Button>
        </div>
      </header>

      {/* Индикатор прогресса */}
      <div className={styles.progressSection}>
        <p className={styles.stepText}>Шаг {step} из 3</p>
        <div className={styles.progressBar}>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={`${styles.progressStep} ${
                index < step ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Основное содержимое */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Левая часть - Форма */}
          <div className={styles.formSection}>
            {step === 1 && (
              <FormStepOne onFormSubmit={handleNext} defaultValues={formData} />
            )}
            {step === 2 && (
              <FormStepTwo
                onFormSubmit={handleNext}
                onReset={handleReset}
                defaultValues={formData}
              />
            )}

            {step === 3 && (
              <FormStepThree
                onFormSubmit={(stepData) => {
                  const fullData: RegistrationData = {
                    ...formData,
                    ...stepData,
                  } as RegistrationData;
                  console.log('Готово к отправке:', fullData);
                }}
                onReset={handleReset}
              />
            )}
          </div>

          {/* Правая часть - Изображение */}
          <div className={styles.imageSection}>{rightSideContent()}</div>
        </div>
      </div>
    </div>
  );
};
