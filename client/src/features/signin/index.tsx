import { gql, useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';

import styles from './styles.module.scss';

type FormValues = {
  email: string;
  password: string;
};

const SIGN_IN_USER = gql`
  mutation SignInUser($data: String!) {
    signIn(data: $data) {
      id
    }
  }
`;

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_USER);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signIn({ variables: { data } });
  };

  return (
    <div className={styles.signin}>
      <div className={styles.formText}>
        <h1>Sign in.</h1>
        <span>
          Not a member? <Link link="/signup">Sign up</Link>
        </span>
      </div>
      <form className={styles.signinForm} onSubmit={handleSubmit(onSubmit)}>
        <>
          <Input
            placeholder="Email"
            {...register('email', { required: true })}
          />
          <div className={styles.error}>
            {errors.email && 'Email is required'}
          </div>
          <Input
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <div className={styles.error}>
            {errors.password && 'Password is required'}
          </div>
          <Button disabled={errors && Object.keys(errors).length > 0}>
            Sign in
          </Button>
        </>
      </form>
    </div>
  );
};

export default SignIn;
