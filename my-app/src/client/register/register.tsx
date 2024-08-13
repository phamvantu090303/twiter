// src/Register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormInputs {
  name: string;
  email: string;
  date_of_birth: string;
  password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Tên là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  date_of_birth: yup.string().required('Ngày sinh là bắt buộc'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
  confirm_password: yup.string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Tên</label>
        <input id="name" {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="date_of_birth">Ngày sinh</label>
        <input id="date_of_birth" type="date" {...register('date_of_birth')} />
        {errors.date_of_birth && <span>{errors.date_of_birth.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Mật khẩu</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
        <input id="confirm_password" type="password" {...register('confirm_password')} />
        {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default Register;
