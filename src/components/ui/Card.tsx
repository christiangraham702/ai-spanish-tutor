import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border transition-all duration-200',
  {
    variants: {
      intent: {
        primary: 'bg-white border-gray-200 hover:border-gray-300',
        secondary: 'bg-gray-50 border-gray-200 hover:border-gray-300',
        accent: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
}

const Card = ({
  children,
  intent,
  size,
  className = '',
  animate = false,
  delay = 0,
  onClick,
}: CardProps) => {
  const content = (
    <div
      className={`${cardVariants({ intent, size })} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Card; 