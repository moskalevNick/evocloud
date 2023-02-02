import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { userActions } from '../redux/user/actions';
import { UserType } from '../types';

export type FounderProps = {
  component: FC<any>;
};

export const Founder: FC<FounderProps> = ({ component: Component }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      navigate('/cloud');
    }

    if (id === 'new') {
      const newUserForServer = {
        group_id: '6',
        login: 'login',
        password: '1234',
        name: 'Unknown',
      };

      dispatch(userActions.addUser(newUserForServer));
    }

    if (id && id !== 'new') {
      // dispatch(clientActions.getClient(id));
    }
  }, [id, dispatch, navigate]);

  return <Component />;
};
