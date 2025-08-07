import { Component as Profile } from './Profile';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Component as Info } from '../../features/profile/Info/Info';

const meta: Meta<typeof Profile> = {
  title: 'Pages/Profile',
  component: Profile,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/profile/info']}>
        <Provider store={store}>
          <Routes>
            <Route path="/profile" element={<Story />}>
              <Route path="info" element={<Info />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  render: () => <Profile />,
};
