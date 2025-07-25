import type { Meta, StoryObj } from '@storybook/react-vite';
import { Registration } from './Registration';
import { WelcomeSection } from './WelcomeSection';
import { Button } from '../../shared/ui/Button';
import { BrowserRouter } from 'react-router-dom';
import styles from './Registration.module.css';

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
          border: '1px solid #e4e8df',
          borderRadius: '8px',
          background: 'white',
          color: '#253017',
          fontFamily: 'var(--typeface-body)',
          fontSize: '16px',
          fontWeight: '400',
          cursor: 'pointer',
        }}
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
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
          border: '1px solid #e4e8df',
          borderRadius: '8px',
          background: 'white',
          color: '#253017',
          fontFamily: 'var(--typeface-body)',
          fontSize: '16px',
          fontWeight: '400',
          cursor: 'pointer',
        }}
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
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
            color: '#253017',
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
            border: '1px solid #e4e8df',
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
            color: '#253017',
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
              border: '1px solid #e4e8df',
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
            color: '#9ca197',
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
