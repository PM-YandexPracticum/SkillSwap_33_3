import { useEffect, useState } from 'react';
import { usersApi, skillsApi, type User, type Skill } from '../api/client';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, skillsData] = await Promise.all([
          usersApi.getAll(),
          skillsApi.getAll(),
        ]);
        setUsers(usersData);
        setSkills(skillsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>SkillSwap API Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Пользователи</h2>
        <p>Найдено пользователей: {users.length}</p>
        {users.slice(0, 3).map((user) => (
          <div key={user.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
            <strong>{user.name}</strong> ({user.city})
            <br />
            {user.aboutMe}
          </div>
        ))}
      </div>

      <div>
        <h2>Категории навыков</h2>
        <p>Найдено категорий: {skills.length}</p>
        {skills.slice(0, 3).map((skill, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <strong>{skill.name}</strong> ({skill.subcategories.length} подкатегорий)
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
