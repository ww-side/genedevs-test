import { ChangeEvent, FC } from 'react';

interface TextInputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const CreateTestField: FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type="text"
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none bg-transparent ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CreateTestField;
