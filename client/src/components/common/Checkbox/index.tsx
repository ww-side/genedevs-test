import { ChangeEvent, FC } from 'react';

interface TextInputProps {
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<TextInputProps> = ({ value, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2">
      <input
        className="h-5 w-5 accent-light-coral"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
};

export default Checkbox;
