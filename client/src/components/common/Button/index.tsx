import { FC, ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  color: 'coral' | 'black';
}

enum Colors {
  CORAL = 'bg-pale-pink hover:bg-light-coral text-light-coral hover:text-white',
  BLACK = 'bg-black hover:bg-zinc-700 text-white',
}

const Button: FC<ButtonProps> = ({ onClick, children, color }) => {
  const CORAL_COLOR = 'coral';
  const BLACK_COLOR = 'black';

  const getColor = (color: string) => {
    switch (color) {
      case BLACK_COLOR:
        return Colors.BLACK;
      case CORAL_COLOR:
        return Colors.CORAL;
      default:
        return Colors.BLACK;
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-1 tracking-[.125em] font-medium ${getColor(
        color,
      )} py-3 px-5 rounded-md shadow-2xl transition duration-300 ease-in-out mb-3`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
