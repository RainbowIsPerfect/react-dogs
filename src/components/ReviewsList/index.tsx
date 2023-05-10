import { Review } from '../../types';
import { AddReviewForm } from '../Forms/AddReviewForm';
import { Rating } from '../UI/Rating';
import s from './reviews-list.module.scss';

interface ReviewsListProps {
  reviews: Review[];
  _id: string;
}

export const ReviewsList = ({ reviews, _id }: ReviewsListProps) => {
  return (
    <div className={s.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review, i) => {
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
              <Rating className={s.review__rating} rating={review.rating} />
              <p className={s.review__date}>Reviewed on {review.created_at}</p>
              {review.created_at === review.updated_at ? null : (
                <p className={s.review__date}>Updated on {review.updated_at}</p>
              )}
              <p className={s.review__text}>{review.text}</p>
            </div>
          );
        })
      ) : (
        <p className={s.reviews__message}>
          There are no reviews for this product yet
        </p>
      )}
      <AddReviewForm className={s.reviews__form} _id={_id} />
    </div>
  );
};
