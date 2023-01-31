import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';
import { UserCard } from '../UserCard/UserCard';

import styles from './UserModal.module.css';
import { userActions } from '../../redux/user/actions';

export const UserModal = () => {
  // const { isClientLoading, currentClient } = useAppSelector((state) => state.clientReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onClose = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   if (!id) {
  //     navigate('/users');
  //   }

  //   if (id === 'new') {
  //     const newUserForServer = {
  //       group_id: '6',
  //       login: 'login',
  //       password: '1234',
  //       name: 'Unknown',
  //     };

  //     // dispatch(userActions.addUser(newUserForServer));
  //   }

  //   if (id && id !== 'new') {
  //     console.log('get old user');

  //     // dispatch(clientActions.getClient(id));
  //   }
  // }, [id, navigate]);

  return (
    <Modal open={true} onClose={onClose} className={styles.modalUser}>
      <UserCard />
    </Modal>
  );
};
