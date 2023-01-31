import styles from './UserCard.module.css';
import React, { useEffect, useState, useMemo, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import Draggable, { DraggableData } from 'react-draggable';
import { ClientType, CreateClientType, CreateUserType, ImageType, UserType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { t } from 'i18next';
import { PlusIcon } from '../Icons/PlusIcon';
import { EditIcon } from '../Icons/EditIcon';
import { EditIconActive } from '../Icons/EditIconActive';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { EyeIcon } from '../Icons/EyeIcon';
import { CrossEyeIcon } from '../Icons/CrossEyeIcon';
import { StopIcon } from '../Icons/StopIcon';
import { userActions } from '../../redux/user/actions';

export const UserCard = () => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isShowPassword, showPassword] = useState(false);
  const [isShowPasswordRepeat, showPasswordRepeat] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [nameInputValue, setNameInputValue] = useState('');
  const [loginInputValue, setLoginInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordRepeatInputValue, setPasswordRepeatInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [phoneInputValue, setPhoneInputValue] = useState('');

  const isUserClassnames = classNames(styles.isAdminButton, !isAdmin && styles.activeButton);
  const isAdminClassnames = classNames(styles.isAdminButton, isAdmin && styles.activeButton);

  const images = useAppSelector((state) => state.imageReducer.images);
  const { users } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== 'new') {
      const currentUser: UserType | undefined = users.find((user) => user.id.toString() === id);
      currentUser && setUser(currentUser);
    }
  }, [id, users]);

  useEffect(() => {
    if (user) {
      user.group_id === '1' && setIsAdmin(true);
      setNameInputValue(user.name);
      setLoginInputValue(user.login);
      setEmailInputValue(user.email);
      setPhoneInputValue(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (passwordInputValue && passwordRepeatInputValue) {
      if (passwordInputValue !== passwordRepeatInputValue) {
        setPasswordMismatch(true);
      } else setPasswordMismatch(false);
    } else setPasswordMismatch(false);
  }, [passwordInputValue, passwordRepeatInputValue]);

  const onSubmit = () => {
    if (!id) {
      navigate('/users');
    }

    const newUserForServer = {
      group_id: isAdmin ? '1' : '6',
      login: loginInputValue,
      password: passwordInputValue,
      name: nameInputValue,
      email: emailInputValue,
      phone: phoneInputValue,
    };

    if (id === 'new') {
      dispatch(userActions.addUser(newUserForServer));
    }

    if (id && id !== 'new') {
      dispatch(userActions.editUser({ newUser: newUserForServer, id }));
    }
    onClose();
  };

  const onClose = () => {
    navigate(-1);
  };

  // const cancelAddingClient = () => {
  //   if (id === 'new') {
  //     dispatch(clientActions.deleteClient(client.id));
  //   }
  //   onClose();
  // };

  return (
    <>
      <div className={styles.userCardHeaderContainer}>
        <div className={styles.modalHeader}>
          {id === 'new' ? (
            <>
              <PlusIcon fill={'#148EF8'} />

              {t('new_user')}
            </>
          ) : (
            <>
              <EditIconActive />
              {t('edit_user_data')}
            </>
          )}
        </div>
      </div>
      <div className={styles.horizontalLine} />
      <div className={styles.userMainDataContainer}>
        <div className={styles.userAvatar}>
          {user && user.avatar ? <img src={user.avatar} /> : <AvatarIcon />}
        </div>
        <div className={styles.isAdminWrapper}>
          <button className={isUserClassnames} onClick={() => setIsAdmin(false)}>
            {t('user')}
          </button>
          <button className={isAdminClassnames} onClick={() => setIsAdmin(true)}>
            {t('administrator')}
          </button>
        </div>
      </div>
      <div className={styles.horizontalFullLine} />
      <div className={styles.userDataContainer}>
        <div className={styles.modalHeader}>{t('user_data')}</div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('full_name_of_the_user')}</div>
            <Input
              placeholder={(t('enter_2') + t('full_name_of_the_user')) as string}
              value={nameInputValue}
              onChange={(e) => setNameInputValue(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('login')}</div>
            <Input
              placeholder={(t('enter_2') + t('login')) as string}
              value={loginInputValue}
              onChange={(e) => setLoginInputValue(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('password')}</div>
            <Input
              placeholder={(t('enter_2') + t('password')) as string}
              type={isShowPassword ? 'text' : 'password'}
              afterIcon={
                <div onClick={() => showPassword((prev) => !prev)}>
                  {isShowPassword ? <EyeIcon /> : <CrossEyeIcon />}
                </div>
              }
              value={passwordInputValue}
              onChange={(e) => setPasswordInputValue(e.target.value)}
              hasError={passwordMismatch}
            />
            {passwordMismatch && (
              <div className={styles.errorWrapper}>
                <StopIcon />
                <span className={styles.errorLabel}>{t('passwords_mismatch')}</span>
              </div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('repeat_password')}</div>
            <Input
              placeholder={(t('enter_2') + t('password')) as string}
              type={isShowPasswordRepeat ? 'text' : 'password'}
              afterIcon={
                <div onClick={() => showPasswordRepeat((prev) => !prev)}>
                  {isShowPasswordRepeat ? <EyeIcon /> : <CrossEyeIcon />}
                </div>
              }
              value={passwordRepeatInputValue}
              onChange={(e) => setPasswordRepeatInputValue(e.target.value)}
              hasError={passwordMismatch}
            />
            {passwordMismatch && (
              <div className={styles.errorWrapper}>
                <StopIcon />
                <span className={styles.errorLabel}>{t('passwords_mismatch')}</span>
              </div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>E-mail</div>
            <Input
              placeholder={(t('enter_2') + 'E-mail') as string}
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('phone_number')}</div>
            <Input
              placeholder={(t('enter_2') + t('phone_number')) as string}
              value={phoneInputValue}
              onChange={(e) => setPhoneInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.horizontalFullLine} />
      <div>
        <div className={styles.submitButtonsWrapper}>
          <Button outlined className={styles.submitButton} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button className={styles.submitButton} onClick={onSubmit} disabled={passwordMismatch}>
            {t('save')}
          </Button>
        </div>
      </div>
    </>
  );
};
