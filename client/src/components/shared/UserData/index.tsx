import { FC } from 'react';
import { useGetUserByIdQuery } from '../../../store/api/users.api.ts';

interface UserDataProps {
  owner: string;
}

const UserData: FC<UserDataProps> = ({ owner }) => {
  const { data: userData } = useGetUserByIdQuery(owner);

  if (!userData) {
    return null;
  }

  return <p>Created by: {userData.username}</p>;
};

export default UserData;
