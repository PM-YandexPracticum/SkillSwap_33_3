import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import logoIcon from '@/assets/svg/logo.svg';
import { Button } from '@/shared/ui/Button';
import CrossIcon from '@/assets/svg/icons/cross.svg?react';
import { WelcomeSection } from '@/features/registration/ui/WelcomeSection';
import iconStep1 from '@/assets/svg/light-bulb.svg';
import iconStep2 from '@/assets/svg/user-info.svg';
import iconStep3 from '@/assets/svg/school-board.svg';
import { useDispatch } from '@/app/store';
import { fetchSkills } from '@/features/slices/skillsSlice';
import { authApiClient } from '@/api/authClient';
import { createSkill } from '@/api/authClient';
import { Loader } from '@/shared/ui/Loader';
import type { TSkillInfo } from '@/shared/lib/types';
import { SkillInfo } from '@/shared/ui/SkillInfo';
import { Gallery } from '@/widgets/Gallery';
import EditIcon from '@/assets/svg/icons/edit.svg?react';

const FormStepOne = lazy(
  () => import('@/features/registration/ui/FormStepOne')
);
const FormStepTwo = lazy(
  () => import('@/features/registration/ui/FormStepTwo')
);
const FormStepThree = lazy(
  () => import('@/features/registration/ui/FormStepThree')
);
const Modal = lazy(() => import('@/shared/ui/Modal/Modal'));

export interface StepOneData {
  email: string;
  password: string;
}
export interface StepTwoData {
  avatar?: File | null;
  name: string;
  birthDate: Date | null;
  gender?: string;
  city: string;
  categories?: string[];
  subcategories?: string[];
}

export interface SkillRegistrationData {
  title: string;
  category: string;
  subcategory: string;
  description?: string;
  images?: File[];
}

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<StepOneData & StepTwoData>>(
    {}
  );

  const handleNext = (data: StepOneData | StepTwoData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleRegistrationSubmit = async (
    stepData: SkillRegistrationData | null
  ) => {
    const userData: StepOneData & StepTwoData = {
      email: formData.email!,
      password: formData.password!,
      avatar: formData.avatar,
      name: formData.name!,
      birthDate: formData.birthDate!,
      gender: formData.gender,
      city: formData.city!,
      categories: formData.categories,
      subcategories: formData.subcategories,
    };
    const skillData = stepData;

    try {
      await authApiClient.register(userData);

      console.log(skillData);

      if (skillData) {
        openModal();
        const newSkill = await createSkill(skillData);
        setSkillInfo(newSkill);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Ошибка регистрации или создания навыка:', err);
    }
  };

  const handleReset = () => {
    setFormData((prev) => {
      const updated = { ...prev };

      if (step === 2) {
        delete updated.name;
        delete updated.birthDate;
        delete updated.gender;
        delete updated.city;
        delete updated.categories;
        delete updated.subcategories;
      }

      return updated;
    });

    setStep((prev) => Math.max(1, prev - 1));
  };
  const handleClose = () => {
    navigate('/');
  };

  const [skillInfo, setSkillInfo] = useState<TSkillInfo>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <Suspense fallback={<Loader />}>
                <FormStepOne
                  onFormSubmit={handleNext}
                  defaultValues={formData}
                />
              </Suspense>
            )}
            {step === 2 && (
              <Suspense fallback={<Loader />}>
                <FormStepTwo
                  onFormSubmit={handleNext}
                  onReset={handleReset}
                  defaultValues={formData}
                />
              </Suspense>
            )}

            {step === 3 && (
              <Suspense fallback={<Loader />}>
                <FormStepThree
                  onFormSubmit={handleRegistrationSubmit}
                  onReset={handleReset}
                />
              </Suspense>
            )}
          </div>

          {/* Правая часть - Изображение */}
          <div className={styles.imageSection}>{rightSideContent()}</div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {skillInfo ? (
              <>
                <div className={styles.headerModal}>
                  <h2 className={styles.title}>Ваше предложение</h2>
                  <p className={styles.description}>
                    {' '}
                    Пожалуйста, проверьте и подтвердите правильность данных
                  </p>
                </div>
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
            ) : (
              <div
                style={{
                  minHeight: 532,
                  minWidth: 1024,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Loader />
              </div>
            )}
          </Modal>
        )}
      </Suspense>
    </div>
  );
}

export const Component = Registration;
