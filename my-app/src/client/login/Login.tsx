// src/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
});

const Login: React.FC = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(' http://localhost:3000/api/login', data);
      toast.success('Đăng nhập thành công!');
      console.log('Đăng nhập thành công:', response.data);
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      console.error('Lỗi:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
