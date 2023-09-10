import { ChangeEvent, FC, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts';
import { authSlice } from '../../../store/reducers/authSlice.ts';
import {
  useLoginMutation,
  useRegistrationMutation,
} from '../../../store/api/users.api.ts';
import Input from '../../common/Input';
import Button from '../../common/Button';
import authImg from '../../../assets/login.svg';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../../models/token.ts';

interface AuthFormProps {
  template: 'login' | 'registration';
}

const AuthForm: FC<AuthFormProps> = ({ template }) => {
  const { username, password } = useAppSelector(state => state.auth);
  const { setUsername, setPassword } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const [registrationMutation] = useRegistrationMutation();
  const [loginMutation] = useLoginMutation();

  const handleLogin = async (user: Object) => {
    const res = await loginMutation(user);
    const token = res as Token;
    localStorage.setItem('jwtToken', token.data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    try {
      template === 'login'
        ? await handleLogin(user)
        : await registrationMutation(user);
    } catch (error) {
      console.error('Auth error', error);
    }
    window.location.reload();
  };

  const handleAuthTemplateChange = () => {
    template === 'login' ? navigate('/registration') : navigate('/login');
  };

  return (
    <form
      className="flex flex-col justify-center h-screen gap-3 w-4/12 mx-auto "
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button color="coral">
        {template === 'login' ? 'Log in' : 'Registration'}
      </Button>
      <p>
        Already have an account?{' '}
        <span
          className="cursor-pointer text-light-coral hover:opacity-70"
          onClick={handleAuthTemplateChange}
        >
          {template === 'login' ? 'Sign Up' : 'Log In'}
        </span>
      </p>
      <img className="w-1/3 h-1/3 mx-auto mt-5" src={authImg} alt="auth-img" />
    </form>
  );
};

export default AuthForm;
