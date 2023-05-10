import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { CurrentUserProducts } from '../../components/CurrentUserProducts';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { useGetCurrentUserQuery } from '../../store/slices/userApiSlice';
import s from './profile.module.scss';

export const Profile = () => {
  const { data, error, isLoading, isSuccess } = useGetCurrentUserQuery();

  return (
    <>
      <ConditionalRenderer
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
        className={s.profile}
      >
        {data && (
          <>
            <div className={s['profile__image-wrapper']}>
              <img
                className={s.profile__image}
                src={data.avatar}
                alt="Profile pic"
              />
            </div>
            <div className={s.profile__info}>
              <p className={s.profile__name}>{data.name}</p>
              <p className={s.profile__group}>Your group: {data.group}</p>
              <p className={s.profile__description}>{data.about}</p>
              <TypedLink
                className={s.profile__link}
                variant="primary"
                to="/edit"
              >
                Edit profile
              </TypedLink>
            </div>
          </>
        )}
      </ConditionalRenderer>
      <CurrentUserProducts />
    </>
  );
};
