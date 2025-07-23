import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterSection } from './FilterSection';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import chevronDownIcon from '../../../assets/svg/icons/chevron-down.svg';
import styles from './FilterSection.module.css';

const meta = {
  title: 'UI/FilterSection',
  component: FilterSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FilterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapper = {
  padding: '20px 20px 20px 23px',
  backgroundColor: 'var(--surface-main)',
  borderRadius: '12px',
  width: '324px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
};

export const Default: Story = {
  args: {
    title: 'Категории',
    buttonTitle: 'Показать все',
    maxVisible: 3,
    children: (
      <>
        <Checkbox name="demo" value="1">
          Категория 1
        </Checkbox>
        <Checkbox name="demo" value="2">
          Категория 2
        </Checkbox>
        <Checkbox name="demo" value="3">
          Категория 3
        </Checkbox>
      </>
    ),
  },
  render: (args) => (
    <div style={storyWrapper}>
      <FilterSection {...args} />
    </div>
  ),
};

const FilterCheckbox = ({
  children,
  withChevron = false,
  size = 'medium',
  ...props
}: {
  children: string;
  withChevron?: boolean;
  size?: 'medium' | 'large';
}) => (
  <div
    className={`${styles.checkboxContainer} ${size === 'large' ? styles.checkboxLarge : styles.checkboxMedium}`}
  >
    <Checkbox {...props}>
      <span className={styles.checkboxLabel}>{children}</span>
    </Checkbox>
    {withChevron && (
      <img src={chevronDownIcon} alt="" className={styles.chevronIcon} />
    )}
  </div>
);

const FilterRadio = ({
  children,
  size = 'medium',
  ...props
}: {
  children: string;
  size?: 'medium' | 'large';
}) => (
  <div
    className={`${styles.radioContainer} ${size === 'large' ? styles.radioLarge : styles.radioMedium}`}
  >
    <RadioButton {...props}>
      <span className={styles.radioLabel}>{children}</span>
    </RadioButton>
  </div>
);

export const CompleteFilter = () => (
  <div style={storyWrapper}>
    <FilterSection>
      <FilterRadio name="filter-type" value="all" size="medium" defaultChecked>
        Всё
      </FilterRadio>
      <FilterRadio name="filter-type" value="learn" size="medium">
        Хочу научиться
      </FilterRadio>
      <FilterRadio name="filter-type" value="teach" size="medium">
        Могу научить
      </FilterRadio>
    </FilterSection>

    <FilterSection title="Навыки" buttonTitle="Все категории" maxVisible={6}>
      <FilterCheckbox name="skills" value="business" withChevron size="medium">
        Бизнес и карьера
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="creativity" size="medium">
        Творчество и искусство
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="languages" size="medium">
        Иностранные языки
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="education" size="medium">
        Образование и развитие
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="health" size="medium">
        Здоровье и лайфстайл
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="home" size="medium">
        Дом и уют
      </FilterCheckbox>
      <FilterCheckbox name="skills" value="programming" size="medium">
        Программирование
      </FilterCheckbox>
    </FilterSection>

    <FilterSection title="Пол автора" maxVisible={3}>
      <FilterRadio name="gender" value="any" size="medium">
        Не имеет значения
      </FilterRadio>
      <FilterRadio name="gender" value="male" size="medium">
        Мужской
      </FilterRadio>
      <FilterRadio name="gender" value="female" size="medium">
        Женский
      </FilterRadio>
    </FilterSection>

    <FilterSection title="Город" buttonTitle="Все города" maxVisible={5}>
      <FilterCheckbox name="city" value="moscow" size="large">
        Москва
      </FilterCheckbox>
      <FilterCheckbox name="city" value="petersburg" size="large">
        Санкт-Петербург
      </FilterCheckbox>
      <FilterCheckbox name="city" value="novosibirsk" size="large">
        Новосибирск
      </FilterCheckbox>
      <FilterCheckbox name="city" value="ekaterinburg" size="large">
        Екатеринбург
      </FilterCheckbox>
      <FilterCheckbox name="city" value="kazan" size="large">
        Казань
      </FilterCheckbox>
      <FilterCheckbox name="city" value="sochi" size="large">
        Сочи
      </FilterCheckbox>
    </FilterSection>
  </div>
);
