import image500 from '@/assets/svg/error-500.svg';
import { ErrorPage } from '@/shared/ui/ErrorPage/ErrorPage';
import style from './ServerError.module.css';

export default function ServerError() {
  return (
    <ErrorPage
      image={image500}
      title="На сервере произошла ошибка"
      description="Попробуйте позже или вернитесь на главную страницу"
      className={style.errorPadding}
      imageClassName={style.fullSizeImage}
    />
  );
}
