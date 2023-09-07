import { ChangeEvent, FC, useState } from 'react';
import { v4 as id } from 'uuid';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';

interface InputProps {
  type: string;
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
}

const Input: FC<InputProps> = ({ placeholder, type, onChange, value }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const inputType = type === 'password' && isShowPassword ? 'text' : type;

  return (
    <div className="border border-gray-300 rounded px-3 py-2 flex items-center gap-2">
      <input
        id={id()}
        className="focus:outline-none bg-transparent w-full"
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {type === 'password' ? (
        isShowPassword ? (
          <GrFormView
            className="cursor-pointer"
            onClick={handleShowPassword}
            size={20}
          />
        ) : (
          <GrFormViewHide
            className="cursor-pointer"
            onClick={handleShowPassword}
            size={20}
          />
        )
      ) : null}
    </div>
  );
};

export default Input;
