import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, useDispatch } from '../../app/store';
import { fetchSkills } from '../../features/slices/skillsSlice';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  dispatch(fetchSkills());

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundColor: '#f9faf7',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export const Default: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <WrapperComponent>
            <Header />
          </WrapperComponent>
        </MemoryRouter>
      </Provider>
    );
  },
};
