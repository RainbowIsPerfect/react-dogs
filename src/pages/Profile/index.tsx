import { useGetCurrentUserQuery } from '../../store/slices/productsSlice';

export const Profile = () => {
  const { data, isError, isLoading } = useGetCurrentUserQuery();
  return (
    <div>
      <img src={data?.avatar} alt="Profile pic" />
      <p>{data?.name}</p>
      <p>{data?.about}</p>
    </div>
  );
};
