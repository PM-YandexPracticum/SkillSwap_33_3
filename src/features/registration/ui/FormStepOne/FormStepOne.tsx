import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';
import GoogleIcon from '@/assets/svg/icons/Google.svg?react';
import AppleIcon from '@/assets/svg/icons/Apple.svg?react';
import EyeIcon from '@/assets/svg/icons/eye.svg?react';
import EyeSlashIcon from '@/assets/svg/icons/eye-slash.svg?react';
import styles from './FormStepOne.module.css';
import * as validation from '@/shared/constants/validation';

interface FormStepOneData {
  email: string;
  password: string;
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit: (data: Partial<FormStepOneData>) => void;
  onReset?: () => void;
  defaultValues?: Partial<FormStepOneData>;
}

export const FormStepOne: React.FC<FormProps> = ({
  onFormSubmit,
  onReset,
  defaultValues,
  ...rest
}) => {
  const [email, setEmail] = useState(defaultValues?.email || '');
  const [password, setPassword] = useState(defaultValues?.password || '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let succeded = true;
    if (email.length === 0) {
      setEmailError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    if (password.length === 0) {
      setPasswordError(validation.eMessageFieldMustBeNotEmpty);
      succeded = false;
    }

    return succeded;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      onFormSubmit({ email, password });
    }
  };

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPasswordError(''), [password]);

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onReset?.();
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      {...rest}
      className={styles.form}
    >
      <div className={styles.providers}>
        <Button variant="outline" startIcon={<GoogleIcon />} type="button">
          Продолжить с Google
        </Button>
        <Button variant="outline" startIcon={<AppleIcon />} type="button">
          Продолжить с Apple
        </Button>
      </div>

      <div className={styles.wrapper}>
        <span className={styles.text}>или</span>
      </div>

      <div className={styles.providers}>
        <FormInput
          title="Email"
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />

        <FormInput
          title="Пароль"
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Придумайте надёжный пароль"
          svg={
            isPasswordVisible ? (
              <EyeSlashIcon onClick={() => setIsPasswordVisible(false)} />
            ) : (
              <EyeIcon onClick={() => setIsPasswordVisible(true)} />
            )
          }
          error={passwordError}
        />
      </div>

      <Button variant="primary" type="submit">
        Далее
      </Button>
    </form>
  );
};
