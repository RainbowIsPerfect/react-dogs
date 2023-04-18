import { Review } from '../../store/slices/productsSlice';
import s from './review.module.scss';

interface ReviewPostProps {
  review: Review;
}

export const ReviewPost = ({ review }: ReviewPostProps) => {
  return (
    <div className={s.review}>
      <p>{review.author}</p>
      <p>{review.text}</p>
    </div>
  );
};
