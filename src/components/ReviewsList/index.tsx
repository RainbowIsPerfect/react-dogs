import { Review } from '../../types';
import { AddReviewForm } from '../Forms/AddReviewForm';
import { ReviewCard } from '../ReviewCard';
import s from './reviews-list.module.scss';

interface ReviewsListProps {
  reviews: Review[];
  _id: string;
}

export const ReviewsList = ({ reviews, _id }: ReviewsListProps) => {
  return (
    <div className={s.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review, i) => (
          <ReviewCard review={review} _id={_id} key={i} />
        ))
      ) : (
        <p className={s.reviews__message}>
          There are no reviews for this product yet
        </p>
      )}
      <AddReviewForm className={s.reviews__form} _id={_id} />
    </div>
  );
};
