import React, { useCallback } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Показывать крестик для очистки поля */
  clear?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, clear, disabled, ...props }, ref) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
      },
      [onChange],
    );

    const handleClear = () => {
      onChange('');
    };

    return (
      <div className={cn(styles.wrapper, className)}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.input}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {clear && value && !disabled && (
          <div className={styles.clearIcon} onClick={handleClear}>
            ×
          </div>
        )}
        {afterSlot && <div className={styles.inputAfterSlot}>{afterSlot}</div>}
      </div>
    );
  },
);

export default React.memo(Input);
