import { SkillsMenu } from './SkillsMenu';
import { DropdownBase } from '../../shared/ui/DropdownBase/DropdownBase';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SkillsMenu> = {
  title: 'widgets/SkillsMenu',
  component: SkillsMenu,
};
export default meta;

type Story = StoryObj<typeof SkillsMenu>;

export const Menu: Story = {
  render: () => (
    <BrowserRouter>
      <div style={{ position: 'relative' }}>
        <DropdownBase onClose={() => {}}>
          <SkillsMenu></SkillsMenu>
        </DropdownBase>
      </div>
    </BrowserRouter>
  ),
};
