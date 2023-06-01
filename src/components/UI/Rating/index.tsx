import { DefaultProps } from '../../../types/prop-types';
import { StarIcon } from '../Icons/StarIcon';
import s from './rating.module.scss';

interface RatingProps extends DefaultProps {
  rating: number;
  counter?: number;
}

export const Rating = ({ rating, counter, className = '' }: RatingProps) => {
  const starsIcons = (
    <div className={`${className}`}>
      {[...new Array(5)].map((_, index) => {
        return (
          <StarIcon
            className={`${s.rating__icon} ${
              rating > index ? s.rating__icon_active : ''
            }`}
            key={index}
          />
        );
      })}
    </div>
  );

  if (!counter) {
    return starsIcons;
  }

  return (
    <div className={`${s.rating} ${className}`}>
      {starsIcons}
      <span className={s.rating__count}>({counter})</span>
    </div>
  );
};
