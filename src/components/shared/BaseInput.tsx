import { Input, type InputProps } from 'antd';

interface IProps extends InputProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
}

export const BaseInput: React.FC<IProps> = ({
  label,
  errorMessage,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 font-medium text-sm text-gray-700">
          <span className={`${required ? 'text-red-500 pr-1' : ''}`}>*</span>{label}
        </div>
      )}
      <Input
        className={`${className}`}
        {...props}
      />
      {errorMessage && <div className="mt-1 text-red-500 text-sm">{errorMessage}</div>}
    </div>
  );
};
