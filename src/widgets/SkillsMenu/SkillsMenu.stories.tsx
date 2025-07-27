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

const skills = [
  {
    name: 'Бизнес и карьера',
    subcategories: [
      {
        name: 'Управление командой',
      },
      {
        name: 'Маркетинг и реклама',
      },
      {
        name: 'Продажи и переговоры',
      },
      {
        name: 'Личный бренд',
      },
      {
        name: 'Резюме и собеседование',
      },
      {
        name: 'Тайм-менеджмент',
      },
      {
        name: 'Проектное управление',
      },
      {
        name: 'Предпринимательство',
      },
    ],
  },
  {
    name: 'Иностранные языки',
    subcategories: [
      {
        name: 'Английский',
      },
      {
        name: 'Французский',
      },
      {
        name: 'Испанский',
      },
      {
        name: 'Немецкий',
      },
      {
        name: 'Китайский',
      },
      {
        name: 'Японский',
      },
      {
        name: 'Подготовка к экзаменам (IELTS, TOEFL)',
      },
    ],
  },
  {
    name: 'Дом и уют',
    subcategories: [
      {
        name: 'Уборка и организация',
      },
      {
        name: 'Домашние финансы',
      },
      {
        name: 'Приготовление еды',
      },
      {
        name: 'Домашние растения',
      },
      {
        name: 'Ремонт',
      },
      {
        name: 'Хранение вещей',
      },
    ],
  },
  {
    name: 'Творчество и искусство',
    subcategories: [
      {
        name: 'Рисование и иллюстрация',
      },
      {
        name: 'Фотография',
      },
      {
        name: 'Видеомонтаж',
      },
      {
        name: 'Музыка и звук',
      },
      {
        name: 'Актёрское мастерство',
      },
      {
        name: 'Креативное письмо',
      },
      {
        name: 'Арт-терапия',
      },
      {
        name: 'Декор и DIY',
      },
    ],
  },
  {
    name: 'Образование и развитие',
    subcategories: [
      {
        name: 'Личностное развитие',
      },
      {
        name: 'Навыки обучения',
      },
      {
        name: 'Когнитивные техники',
      },
      {
        name: 'Скорочтение',
      },
      {
        name: 'Навыки преподавания',
      },
      {
        name: 'Коучинг',
      },
    ],
  },
  {
    name: 'Здоровье и лайфстайл',
    subcategories: [
      {
        name: 'Йога и медитация',
      },
      {
        name: 'Питание и ЗОЖ',
      },
      {
        name: 'Ментальное здоровье',
      },
      {
        name: 'Осознанность',
      },
      {
        name: 'Физические тренировки',
      },
      {
        name: 'Сон и восстановление',
      },
      {
        name: 'Баланс жизни и работы',
      },
    ],
  },
];

export const Menu: Story = {
  render: () => (
    <BrowserRouter>
      <div style={{ position: 'relative' }}>
        <DropdownBase onClose={() => {}}>
          <SkillsMenu skillsData={skills}></SkillsMenu>
        </DropdownBase>
      </div>
    </BrowserRouter>
  ),
};

export const NoSkills: Story = {
  render: () => (
    <BrowserRouter>
      <div style={{ position: 'relative' }}>
        <DropdownBase onClose={() => {}}>
          <SkillsMenu skillsData={[]}></SkillsMenu>
        </DropdownBase>
      </div>
    </BrowserRouter>
  ),
};
