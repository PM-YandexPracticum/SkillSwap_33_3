import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SkillsMenu.module.css';

// Импорт иконок категорий
import BusinessIcon from '../../assets/svg/SkillsMenu/business-career.svg';
import CreativeIcon from '../../assets/svg/SkillsMenu/creativity-art.svg';
import LanguagesIcon from '../../assets/svg/SkillsMenu/foreign-languages.svg';
import EducationIcon from '../../assets/svg/SkillsMenu/education-development.svg';
import HomeIcon from '../../assets/svg/SkillsMenu/home-comfort.svg';
import HealthIcon from '../../assets/svg/SkillsMenu/health-lifestyle.svg';

// Типы для структуры данных
type Subcategory = {
  name: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

const categoryIcons: Record<string, string> = {
  'Бизнес и карьера': BusinessIcon,
  'Творчество и искусство': CreativeIcon,
  'Иностранные языки': LanguagesIcon,
  'Образование и развитие': EducationIcon,
  'Дом и уют': HomeIcon,
  'Здоровье и лайфстайл': HealthIcon,
};

export const SkillsMenu: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/db/skills.json')
      .then((response) => response.json())
      .then((data) => setSkillsData(data))
      .catch((error) => console.error('Error loading skills data:', error));
  }, []);

  return (
    <nav className={styles.menu}>
      {skillsData.map((category) => (
        <div key={category.name} className={styles.category}>
          <Link to="/" className={styles.categoryLink}>
            <img
              src={categoryIcons[category.name] || BusinessIcon}
              alt={category.name}
              className={styles.icon}
            />
            <span className={styles.categoryTitle}>{category.name}</span>
          </Link>
          <div className={styles.subcategories}>
            {category.subcategories.map((sub) => (
              <Link to="/" key={sub.name} className={styles.subcategoryLink}>
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SkillsMenu;
