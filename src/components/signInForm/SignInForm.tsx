import { useState, FormEvent, ReactElement } from 'react';

import styles from './SignInForm.module.css';
import { useSignIn } from '../../hooks';

interface SignInFormProps {
  title?: string;
  buttonText?: string;
}

const SignInForm = ({
  title = 'Sign In',
  buttonText = 'Sign In',
}: SignInFormProps): ReactElement => {
  const { signIn, loading } = useSignIn();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(username, password);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h5 className={styles.title}>{title}</h5>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <label
            htmlFor="username"
            className={styles.label}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className={styles.label}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Signing In...' : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
