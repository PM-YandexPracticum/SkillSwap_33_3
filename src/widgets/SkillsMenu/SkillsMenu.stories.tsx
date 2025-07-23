import SkillsMenu from './SkillsMenu';
import { DropdownBase } from '../../shared/ui/DropdownBase/DropdownBase';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'widgets/SkillsMenu',
  component: SkillsMenu,
};

export const Default = () => (
  <BrowserRouter>
    <DropdownBase onClose={() => {}}>
      <SkillsMenu />
    </DropdownBase>
  </BrowserRouter>
);
