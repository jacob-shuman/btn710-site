import { tw } from 'twind';

type ReactButtonProps = JSX.IntrinsicElements['button'];
export interface CardProps extends ReactButtonProps {}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <button className={tw(`border-2 rounded-lg`, className)} {...props}>
    {children}
  </button>
);

export default Card;
