import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
              dark:bg-gray-700 dark:border-gray-600
              ${error ? 'border-red-300' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;