import { Review } from '../../types';
import { ReviewPost } from '../ReviewPost';
import s from './reviews-list.module.scss';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className={s.review}>
      {reviews.map((review) => {
        return <ReviewPost key={review._id} review={review} />;
      })}
    </div>
  );
};
