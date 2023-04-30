import { Review } from '../../types';
import { StarIcon } from '../UI/Icons/StarIcon';
import s from './reviews-list.module.scss';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className={s.reviews}>
      {reviews.map((review, i) => {
        return (
          <div key={i} className={s.review}>
            <div className={s.review__author}>
              <img
                className={s.review__img}
                src={review.author.avatar}
                alt={`${review.author.name} avatar`}
              />
              <p className={s.review__name}>{review.author.name}</p>
            </div>
            <div className={s.review__rating}>
              {[...new Array(review.rating)].map((_, index) => {
                return <StarIcon className={s.review__icon} key={index} />;
              })}
            </div>
            <p className={s.review__date}>Reviewed on {review.created_at}</p>
            {review.created_at === review.updated_at ? null : (
              <p className={s.review__date}>Updated on {review.updated_at}</p>
            )}
            <p className={s.review__text}>{review.text}</p>
          </div>
        );
      })}
    </div>
  );
};
