import type { Meta, StoryObj } from '@storybook/react-vite';
import { Registration } from './Registration';
import { WelcomeSection } from '../../features/registration/ui/WelcomeSection';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Registration> = {
  title: 'Pages/Registration',
  component: Registration,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: '1440px', height: '1024px', overflow: 'hidden' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Registration>;

export const Step1: Story = {
  args: {
    stepNumber: 1,
    totalSteps: 3,
    children: <div />,
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
    children: <div />,
    rightSideImage: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Здесь будет другое изображение и текст для шага 2</p>
      </div>
    ),
  },
};

export const Step3: Story = {
  args: {
    stepNumber: 3,
    totalSteps: 3,
    children: <div />,
    rightSideImage: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Здесь будет другое изображение и текст для шага 3</p>
      </div>
    ),
  },
};
