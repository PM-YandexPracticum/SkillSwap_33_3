import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileNavigation } from './index';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Navigation/ProfileNavigation',
  component: ProfileNavigation,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '324px',
      height: '752px',
      background: 'var(--surface-main)',
      borderRadius: '24px',
      padding: '42px 41px',
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <StoryWrapper>
          <Story />
        </StoryWrapper>
      </MemoryRouter>
    ),
  ],
};

export const WithActiveItem: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/profile/info']}>
        <StoryWrapper>
          <Story />
        </StoryWrapper>
      </MemoryRouter>
    ),
  ],
};
