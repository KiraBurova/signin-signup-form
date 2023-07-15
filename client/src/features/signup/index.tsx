import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Input from "../../components/input";

import styles from "./styles.module.scss";
import Link from "../../components/link";

type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SIGN_UP_USER = gql`
  mutation SignUpUser($user: SignUpUserInput!) {
    signUpUser(user: $user) {
      email
      username
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const [signUp, { loading, error }] = useMutation(SIGN_UP_USER);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp({ variables: { user: data } });
    navigate("/home");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.signup}>
      <div className={styles.signupInner}>
        <div className={styles.formText}>
          <h1>Create new account.</h1>
          <span>
            Already a member? <Link link="/signin">Sign in</Link>
          </span>
        </div>
        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
          <>
            <Input
              placeholder="Username"
              {...register("username", { required: true })}
            />
            <div className={styles.error}>
              {errors.username && "Username is required"}
            </div>
            <Input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            <div className={styles.error}>
              {errors.email && "Email is required"}
            </div>
            <Input
              autocomplete="new-password"
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            <div className={styles.error}>
              {errors.password && "Password is required"}
            </div>
            <Input
              autocomplete="new-password"
              placeholder="Repeat password"
              type="password"
              {...register("repeatPassword", {
                required: true,
                validate: () =>
                  getValues("repeatPassword") === getValues("password"),
              })}
            />
            <div className={styles.error}>
              {errors.repeatPassword && "Should match password"}
            </div>
            {/* TODO: acceptande checkbox */}
            <div className={styles.error}>{error && error.message}</div>
            <Button
              disabled={(errors && Object.keys(errors).length > 0) || loading}
            >
              Sign up
            </Button>
          </>
        </form>
      </div>
      <div className={styles.image} />
    </div>
  );
};

export default SignUp;
