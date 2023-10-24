import { ReactNode } from 'react';

interface ButtonProps {
  disabled?: boolean;
  type: 'button' | 'submit';
  text: string;
  children?: ReactNode;
}

const Button = ({ disabled = false, type, text, children }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className='w-full px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-900'
      type={type}
    >
      {children}
      {text}
    </button>
  );
};
export default Button;
