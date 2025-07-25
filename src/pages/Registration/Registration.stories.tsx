import type { Meta, StoryObj } from '@storybook/react-vite';
import { Registration } from './Registration';
import { WelcomeSection } from './WelcomeSection';
import { Button } from '../../shared/ui/Button';
import { BrowserRouter } from 'react-router-dom';
import styles from './Registration.module.css';
import GoogleIcon from '../../assets/svg/icons/Google.svg?react';
import AppleIcon from '../../assets/svg/icons/Apple.svg?react';

const meta: Meta<typeof Registration> = {
  title: 'Pages/Registration',
  component: Registration,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Registration>;

// Пример формы первого шага (как на макете)
const Step1Form = () => (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    {/* OAuth кнопки */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
      }}
    >
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: '100%',
          padding: '12px 16px',
          border: '1px solid var(--state-disabled)',
          borderRadius: '8px',
          background: 'var(--surface-main)',
          color: 'var(--text-dominant)',
          fontFamily: 'var(--typeface-body)',
          fontSize: '16px',
          fontWeight: '400',
          cursor: 'pointer',
        }}
        type="button"
      >
        <GoogleIcon width="24" height="24" />
        <span>Продолжить с Google</span>
      </button>

      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: '100%',
          padding: '12px 16px',
          border: '1px solid var(--state-disabled)',
          borderRadius: '8px',
          background: 'var(--surface-main)',
          color: 'var(--text-dominant)',
          fontFamily: 'var(--typeface-body)',
          fontSize: '16px',
          fontWeight: '400',
          cursor: 'pointer',
        }}
        type="button"
      >
        <AppleIcon width="24" height="24" />
        <span>Продолжить с Apple</span>
      </button>
    </div>

    {/* Разделитель */}
    <div className={styles.divider}>
      <div className={styles.dividerLine} />
      <span className={styles.dividerText}>или</span>
    </div>

    {/* Форма email/password */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label
          style={{
            color: 'var(--text-dominant)',
            fontFamily: 'var(--typeface-body)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
          }}
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Введите email"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--state-disabled)',
            borderRadius: '8px',
            fontFamily: 'var(--typeface-body)',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label
          style={{
            color: 'var(--text-dominant)',
            fontFamily: 'var(--typeface-body)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
          }}
        >
          Пароль
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            placeholder="Придумайте надежный пароль"
            style={{
              width: '100%',
              padding: '12px 16px',
              paddingRight: '48px',
              border: '1px solid var(--state-disabled)',
              borderRadius: '8px',
              fontFamily: 'var(--typeface-body)',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            👁
          </button>
        </div>
        <p
          style={{
            marginTop: '4px',
            color: 'var(--text-inactive)',
            fontFamily: 'var(--typeface-body)',
            fontSize: '12px',
            lineHeight: '16px',
            margin: '4px 0 0',
          }}
        >
          Пароль должен содержать не менее 8 знаков
        </p>
      </div>

      <Button variant="primary" style={{ width: '100%', marginTop: '12px' }}>
        Далее
      </Button>
    </div>
  </div>
);

export const Step1: Story = {
  args: {
    stepNumber: 1,
    totalSteps: 3,
    children: <Step1Form />,
    rightSideImage: (
      <WelcomeSection
        title="Добро пожаловать в SkillSwap!"
        description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
      />
    ),
    onCloseClick: () => console.log('Закрыть регистрацию'),
  },
};

export const Step2: Story = {
  args: {
    stepNumber: 2,
    totalSteps: 3,
    children: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>Шаг 2: Персональная информация</h3>
        <p>Здесь будет форма с персональными данными</p>
      </div>
    ),
    rightSideImage: (
      <WelcomeSection
        title="Расскажите о себе"
        description="Заполните профиль, чтобы другие пользователи могли лучше вас узнать"
      />
    ),
  },
};

export const Step3: Story = {
  args: {
    stepNumber: 3,
    totalSteps: 3,
    children: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>Шаг 3: Навыки и интересы</h3>
        <p>Здесь будет форма выбора навыков</p>
      </div>
    ),
    rightSideImage: (
      <WelcomeSection
        title="Выберите навыки"
        description="Укажите, чему хотите научиться и чему можете научить других"
      />
    ),
  },
};
