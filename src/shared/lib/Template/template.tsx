import { FC, ReactNode } from 'react';

interface TemplateProps {
  variant?: 'primary' | 'secondary';
  children?: ReactNode;
  className?: string;
}

export const Template: FC<TemplateProps> = ({
  variant = 'primary',
  children,
  className,
}) => {
  const baseStyle = 'p-4 rounded-lg';
  const variantStyle = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className={`${baseStyle} ${variantStyle[variant]} ${className || ''}`}>
      {children || 'Template Component Content'}
    </div>
  );
};

// Экспорт для использования в stories
export { Template as Component };
