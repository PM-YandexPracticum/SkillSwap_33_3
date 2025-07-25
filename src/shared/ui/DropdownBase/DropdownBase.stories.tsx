import { useState, useRef } from 'react';
import { DropdownBase } from './DropdownBase';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ChevronDown from '../../../assets/svg/icons/chevron-down.svg';
import BusinessIcon from '../../../assets/svg/icons/briefcase.svg';
import '../../../index.css';

const meta: Meta<typeof DropdownBase> = {
  title: 'shared/ui/DropdownBase',
  component: DropdownBase,
};
export default meta;

type Story = StoryObj<typeof DropdownBase>;

const businessCategory = {
  name: 'Бизнес и карьера',
  subcategories: [
    { name: 'Управление командой' },
    { name: 'Маркетинг и реклама' },
    { name: 'Продажи и переговоры' },
    { name: 'Личный бренд' },
    { name: 'Резюме и собеседование' },
    { name: 'Тайм-менеджмент' },
    { name: 'Проектное управление' },
    { name: 'Предпринимательство' },
  ],
};

export const AllSkills: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEnter = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsOpen(true);
    };

    const handleLeave = () => {
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    };

    return (
      <div style={{ padding: 60 }}>
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--typeface-body)',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '150%',
              letterSpacing: '0.02em',
              color: 'var(--text-dominant)',
              cursor: 'pointer',
            }}
          >
            <span>Все навыки</span>
            <img src={ChevronDown} alt="Chevron down" width={24} height={24} />
          </div>

          {isOpen && (
            <DropdownBase onClose={() => setIsOpen(false)}>
              <div
                style={{
                  width: 488,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '100px',
                      background: 'var(--category-business)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={BusinessIcon}
                      alt="Бизнес"
                      width={24}
                      height={24}
                      style={{ display: 'block' }}
                    />
                  </div>

                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--typeface-headings)',
                        fontSize: 24,
                        fontWeight: 500,
                        lineHeight: '117%',
                        letterSpacing: '-0.01em',
                        margin: 0,
                        marginBottom: 12,
                        color: 'var(--text-dominant)',
                      }}
                    >
                      {businessCategory.name}
                    </h2>

                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {businessCategory.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={`/skills/${sub.name.replace(/\s+/g, '-').toLowerCase()}`}
                            style={{
                              textDecoration: 'none',
                              fontFamily: 'var(--typeface-body)',
                              fontWeight: 400,
                              fontSize: 16,
                              lineHeight: '150%',
                              letterSpacing: '0.02em',
                              color: 'var(--text-dominant)',
                            }}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </DropdownBase>
          )}
        </div>
      </div>
    );
  },
};
