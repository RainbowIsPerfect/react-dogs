import { CurrentUserProducts } from '../../components/CurrentUserProducts';
import { TypedLink } from '../../components/TypedLink';
import { useGetCurrentUserQuery } from '../../store/slices/userApiSlice';
import { NotFound } from '../NotFound';
import s from './profile.module.scss';

export const Profile = () => {
  const { data, isError, isLoading, isSuccess } = useGetCurrentUserQuery();

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isSuccess ? (
    <>
      <div className={s.profile}>
        <div className={s['profile__image-wrapper']}>
          <img
            className={s.profile__image}
            src={data.avatar}
            alt="Profile pic"
          />
        </div>
        <div className={s.profile__info}>
          <p className={s.profile__name}>{data.name}</p>
          <ul className={s.profile__list}>
            <li className={s.profile__item}>About: {data.about}</li>
            <li className={s.profile__item}>Group: {data.group}</li>
          </ul>
          <TypedLink className={s.profile__link} component="Link" to="/edit">
            Edit profile
          </TypedLink>
        </div>
      </div>
      <CurrentUserProducts />
    </>
  ) : null;
};
