import React from 'react';
// eslint-disable-next-line import/no-cycle
import { TypeForButton } from './LoginPage';

type Props = {
  data: Data
  hasCreate: boolean,
  hasEmailError: boolean,
  errorFromServer: string,
  hasPasswordError: boolean,
  isAuthentication: boolean
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export const LoginPageUi: React.FC<Props> = ({
  data,
  hasCreate,
  hasEmailError,
  errorFromServer,
  hasPasswordError,
  isAuthentication,
  handleBlur,
  handleSubmit,
  handleChange,
}) => {
  return (
    <div className="starter">
      <form className="box">
        <div className="field">
          <label className="label" htmlFor="email">
            Email
            <div className="control">
              <input
                id="email"
                type="email"
                name="email"
                className="input"
                onBlur={handleBlur}
                onChange={handleChange}
                value={data.email || ''}
                placeholder="e.g. alex@example.com"
              />
            </div>
            {hasEmailError && <p className="error">write your email address (example@mail.com)</p>}
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="password">
            Password
            <div className="control">
              <input
                id="password"
                min={Number(8)}
                type="password"
                name="password"
                className="input"
                onBlur={handleBlur}
                placeholder="********"
                onChange={handleChange}
                value={data.password || ''}
              />
            </div>
            {hasPasswordError && (
              <p className="error">
                write your password
                <br />
                {' '}
                (min length 8)
              </p>
            )}
          </label>
        </div>

        {!isAuthentication && <div className="error">{errorFromServer.slice(5)}</div>}
        {hasCreate && (
          <span className="icon-text has-text-success">
            <span className="icon">
              <i className="fas fa-check-square"></i>
            </span>
            <div>Good work, account created, now log in</div>
            <br />
          </span>
        )}

        <div className="is-flex is-justify-content-space-between">
          <button
            className="button is-primary"
            name={TypeForButton.LOGIN}
            onClick={handleSubmit}
            type="submit"
          >
            Login
          </button>
          <button
            className="button is-primary"
            name={TypeForButton.CREATE}
            onClick={handleSubmit}
            type="submit"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};
