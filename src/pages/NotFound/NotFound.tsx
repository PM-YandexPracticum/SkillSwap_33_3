import { ErrorPage } from '@/shared/ui/ErrorPage/ErrorPage';
import image404 from '@/assets/svg/error-404.svg';

export default function NotFound() {
  return (
    <ErrorPage
      image={image404}
      title="Страница не найдена"
      description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже."
    />
  );
}
