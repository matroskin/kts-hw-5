import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import Input from '../Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import style from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFilter('');
    }
  }, [isOpen]);

  const title = useMemo(() => {
    return value.map((v) => v.value).join(', ');
  }, [value]);

  const isEmpty = value.length === 0;

  const filteredOptions = useMemo(() => {
    return options.filter((option) => option.value.toLowerCase().indexOf(filter.toLowerCase()) === 0);
  }, [filter, options]);

  const selectedKeysSet = useMemo(() => {
    return new Set(value.map((v) => v.key));
  }, [value]);

  const onSelect = useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }

      if (selectedKeysSet.has(option.key)) {
        onChange(value.filter((v) => v.key !== option.key));
      } else {
        onChange([...value, option]);
      }
    },
    [value, onChange, selectedKeysSet, disabled],
  );

  const opened = isOpen && !disabled;

  return (
    <div className={cn(className, style.wrapper, { [style.opened]: opened })} ref={dropdownRef}>
      <Input
        value={opened ? filter : isEmpty ? '' : title}
        placeholder={title}
        disabled={disabled}
        onClick={open}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="accent" />}
      />

      {opened && (
        <div className={style.options}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => onSelect(option)}
              className={cn(style.option, { [style.selected]: selectedKeysSet.has(option.key) })}
            >
              <Text view="p-16" color="primary">
                {option.value}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
