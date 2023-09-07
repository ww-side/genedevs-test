import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import { useRegistrationMutation } from '../../../../store/api/users.api.ts';
import authImg from '../../../../assets/login.svg';

const RegistrationForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [registrationMutation] = useRegistrationMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { username, password };

    try {
      const response = await registrationMutation(user);
      console.log('Регистрация успешно выполнена', response);
    } catch (error) {
      console.error('Ошибка регистрации', error);
    }
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
      <Button color="coral">Registration</Button>
      <img className="w-1/3 h-1/3 mx-auto mt-5" src={authImg} alt="auth-img" />
    </form>
  );
};

export default RegistrationForm;
