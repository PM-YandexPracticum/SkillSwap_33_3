import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CustomDatePicker.module.css';
import CalendarIcon from '@/assets/svg/icons/calendar.svg?react';
import './DatePickerOverrides.css';
import ru from 'date-fns/locale/ru';
import { Button } from '../Button';
import { Select } from '../Select';

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  error?: string;
}

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    displayedValue?: string;
    error?: string;
  }
>(({ onClick, placeholder, displayedValue, error }, ref) => (
  <div className={styles.inputWrapper} onClick={onClick}>
    <input
      type="text"
      value={displayedValue || ''}
      onChange={() => {}}
      placeholder={placeholder}
      ref={ref}
      className={`${styles.input} ${error ? styles.error : ''}`}
      readOnly
    />
    <CalendarIcon className={styles.icon} />
  </div>
));

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  label,
  error,
}) => {
  const [tempDate, setTempDate] = useState<Date | null>(selected);
  const formattedValue = selected ? selected.toLocaleDateString('ru-RU') : '';
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTempDate(selected);
    }
  }, [isOpen, selected]);

  const handleApply = () => {
    onChange(tempDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDate(selected);
    setIsOpen(false);
  };

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <DatePicker
        locale={ru}
        onChange={(date) => setTempDate(date)}
        selected={null}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        dateFormat="dd.MM.yyyy"
        placeholderText="дд.мм.гггг"
        customInput={
          <div>
            <InputWithIcon displayedValue={formattedValue} error={error} />
            {error && <span className={styles.errorMessage}>{error}</span>}
          </div>
        }
        calendarClassName={styles.calendar}
        wrapperClassName={styles.wrapper}
        popperClassName={styles.popper}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        fixedHeight
        dayClassName={(date) =>
          tempDate && date.toDateString() === tempDate.toDateString()
            ? `${styles.day} ${styles.selected}`
            : styles.day
        }
        weekDayClassName={() => styles.weekday}
        renderDayContents={(day) => (
          <div className={styles.dayContent}>{day}</div>
        )}
        calendarContainer={({ children, className }) => (
          <div className={`${className} ${styles.calendarContainer}`}>
            <div className={styles.calendarInner}>
              {children}
              <div className={styles.footerButtons}>
                <Button variant="secondary" onClick={handleCancel}>
                  Отменить
                </Button>
                <Button variant="primary" onClick={handleApply}>
                  Выбрать
                </Button>
              </div>
            </div>
          </div>
        )}
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.customHeader}>
            <Select
              value={months[date.getMonth()]}
              className={`${styles.select} ${styles.borderlessSelect}`}
              valueClassName={`${styles.select} ${styles.customValue}`}
              dropdownClassName={`${styles.select} ${styles.customDropdown}`}
            >
              {months.map((month, index) => (
                <div
                  key={month}
                  role="option"
                  onClick={() => changeMonth(index)}
                >
                  {month}
                </div>
              ))}
            </Select>
            <div className={styles.selectWrapper}>
              <Select
                value={date.getFullYear().toString()}
                className={`${styles.select} ${styles.borderlessSelect}`}
                valueClassName={`${styles.select} ${styles.customValue} ${styles.adjustRight}`}
                dropdownClassName={`${styles.select} ${styles.customDropdown}`}
              >
                {years.map((year) => (
                  <div
                    key={year}
                    role="option"
                    onClick={() => changeYear(year)}
                  >
                    {year}
                  </div>
                ))}
              </Select>
            </div>
          </div>
        )}
      />
    </div>
  );
};
