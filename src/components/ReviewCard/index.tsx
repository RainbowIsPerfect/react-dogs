import { useAppSelector } from '../../hooks/reduxHooks';
import { Review } from '../../types';
import { Button } from '../UI/FormElements/Button';
import { Rating } from '../UI/Rating';
import { ClearIcon } from '../UI/Icons/ClearIcon';
import { useDeleteReviewMutation } from '../../store/slices/productsApiSlice';
import s from './review.module.scss';

interface ReviewProps {
  review: Review;
  _id: string;
}

export const ReviewCard = ({ _id, review }: ReviewProps) => {
  const currentUser = useAppSelector((state) => state.user.userData.name);
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  return (
    <div className={s.review}>
      <div className={s.review__top}>
        <div className={s.review__author}>
          <img
            className={s.review__img}
            src={review.author.avatar}
            alt={`${review.author.name} avatar`}
          />
          <p className={s.review__name}>{review.author.name}</p>
        </div>
        {currentUser === review.author.name && (
          <Button
            onClick={() => deleteReview({ _id, reviewId: review._id })}
            variant="icon"
            className={s.review__button}
            disabled={isLoading}
          >
            <ClearIcon className={s.review__icon} />
          </Button>
        )}
      </div>
      <Rating className={s.review__rating} rating={review.rating} />
      <p className={s.review__date}>Reviewed on {review.createdAt}</p>
      {review.createdAt !== review.updatedAt && (
        <p className={s.review__date}>Updated on {review.updatedAt}</p>
      )}
      <p className={s.review__text}>{review.text}</p>
    </div>
  );
};
