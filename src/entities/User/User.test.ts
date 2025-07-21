// Простой тест для проверки модели User
import { User } from './User';

// Тестовые данные
const testUserData = {
  id: '1',
  email: 'test@example.com',
  avatar: '/avatar.jpg',
  name: 'Тестовый Пользователь',
  birthDate: '1990-07-21', // Сегодня день рождения для теста
  gender: 'male',
  city: 'Москва',
  aboutMe: 'Тестовое описание',
  teachingSkills: [
    {
      category: 'Программирование',
      subcategories: 'Frontend',
      skillName: 'React',
      id: 1,
    },
    {
      category: 'Дизайн',
      subcategories: 'UI/UX',
      skillName: 'Figma',
      id: 2,
    },
  ],
  learningSkills: [
    {
      category: 'Программирование',
      subcategory: 'Backend',
    },
    {
      category: 'Языки',
      subcategory: 'Английский',
    },
  ],
  likes: 42,
};

// Создаём экземпляр пользователя
const user = new User(testUserData);

// Тестируем методы
console.log('=== Тест модели User ===');
console.log('Имя:', user.name);
console.log('Дата рождения:', user.birthDate);
console.log('Возраст:', user.age);
console.log('Возраст строкой:', user.ageString);

console.log('\n=== Навыки обучения ===');
console.log('Все навыки:', user.getLearningSkills());
console.log(
  'Фильтр "Программирование":',
  user.getLearningSkills(['Программирование'])
);

console.log('\n=== Навыки преподавания ===');
console.log('Все навыки:', user.getTeachingSkills());
console.log('Фильтр "Дизайн":', user.getTeachingSkills(['Дизайн']));

export { user as testUser };
