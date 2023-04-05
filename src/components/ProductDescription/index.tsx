import s from './product-description.module.scss';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  return (
    <div className={s.description}>
      <p>{description}</p>
    </div>
  );
};
