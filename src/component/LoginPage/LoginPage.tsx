import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { LoginPageUi } from './LoginPageUi';

// eslint-disable-next-line no-shadow
export enum TypeForInput {
  EMAIL = 'email',
  PASSWORD = 'password'
}

// eslint-disable-next-line no-shadow
export enum TypeForButton {
  LOGIN = 'login',
  CREATE = 'create',
}

export const LoginPage: React.FC = () => {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [hasCreate, setCreate] = useState<boolean>(false);
  const [hasEmailError, setEmailError] = useState<boolean>(false);
  const [errorFromServer, setErrorFromServer] = useState<string>('');
  const [hasPasswordError, setPasswordError] = useState<boolean>(false);
  const [isAuthentication, setAuthentication] = useState<boolean>(true);

  const clearData = () => {
    setData({
      email: '',
      password: '',
    });
  };

  const validateEmail = (url: string) => {
    const validateForm = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return validateForm.test(url);
  };

  const validatePassword = (length: number) => length >= 8;

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case TypeForInput.EMAIL:
        setEmailError(!validateEmail(value));
        break;
      case TypeForInput.PASSWORD:
        setPasswordError(!validatePassword(value.length));
        break;

      default:
        throw new Error('unknown input type');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    validateInput(name, value);
    setAuthentication(true);
    setErrorFromServer('');
    setCreate(false);
    setData({
      ...data,
      [name]: value,
    } as Data);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    validateInput(name, value);
  };

  const createUserAccount = async (email: string, password: string) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      setCreate(true);
      clearData();
    } catch (error: any) {
      setAuthentication(false);
      setErrorFromServer(error.code);
    }
  };

  const loginUserAccount = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      navigate('/home');
      clearData();
    } catch (error: any) {
      setErrorFromServer(error.code);
      setAuthentication(false);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { name } = event.currentTarget;
    const { email, password } = data;

    if (validateEmail(email) && validatePassword(password.length)) {
      switch (name) {
        case TypeForButton.CREATE:
          createUserAccount(email, password);
          break;

        case TypeForButton.LOGIN:
          loginUserAccount(email, password);
          break;

        default:
          throw new Error('unknown button type');
      }
    } else {
      validateInput(TypeForInput.EMAIL, email);
      validateInput(TypeForInput.PASSWORD, password);
    }
  };

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  return (
    <LoginPageUi
      data={data}
      hasCreate={hasCreate}
      hasEmailError={hasEmailError}
      errorFromServer={errorFromServer}
      hasPasswordError={hasPasswordError}
      isAuthentication={isAuthentication}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
  );
};
