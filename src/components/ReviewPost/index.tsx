import { Review } from '../../types';
import s from './review.module.scss';

interface ReviewPostProps {
  review: Review;
}

export const ReviewPost = ({ review }: ReviewPostProps) => {
  return (
    <div className={s.review}>
      <div className={s.review__author}>
        <img className={s.review__img} src={review.author.avatar} alt="" />
        <p className={s.review__name}>{review.author.name}</p>
      </div>
      <p>{review.text}</p>
    </div>
  );
};
