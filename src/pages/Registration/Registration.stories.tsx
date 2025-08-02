import type { Meta, StoryObj } from '@storybook/react-vite';
import { Registration } from './Registration';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const meta: Meta<typeof Registration> = {
  title: 'Pages/Registration',
  component: Registration,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div
            style={{ width: '1440px', height: '1024px', overflow: 'hidden' }}
          >
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Registration>;

// Компонент управляет всем сам — шагами, контентом, состоянием, кнопкой закрытия
export const Default: Story = {};
