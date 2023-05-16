import { useInView } from 'react-intersection-observer';
import { useToggleLikeMutation } from '../../../store/slices/productsApiSlice';
import { ProductWithCustomProps } from '../../../types';
import { TypedLink } from '../../TypedLinks/TypedLink';
import { Button } from '../../UI/FormElements/Button';
import { LikeIcon } from '../../UI/Icons/LikeIcon';
import s from '../card.module.scss';

type CardHeaderProps = Pick<
  ProductWithCustomProps,
  '_id' | 'tags' | 'name' | 'pictures' | 'likes' | 'isLiked'
>;

export const CardHeader = ({
  _id,
  isLiked,
  likes,
  name,
  pictures,
  tags,
}: CardHeaderProps) => {
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <header ref={ref} className={s.card__header}>
      <TypedLink
        to="/products/:productId"
        params={{ productId: _id }}
        variant="unstyled"
        className={s.card__link}
      >
        {inView && <img className={s.card__image} src={pictures} alt={name} />}
      </TypedLink>
      {tags.length !== 0 && (
        <ul className={s.card__tags}>
          {tags.map((tag, i) => (
            <li key={i} className={s.card__tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
      <Button
        disabled={isLoading}
        className={s.card__like}
        variant="icon"
        onClick={() => toggleLike({ _id, likes })}
      >
        <LikeIcon
          className={`${s.card__icon} ${isLiked ? s.card__icon_active : ''}`}
        />
      </Button>
    </header>
  );
};
