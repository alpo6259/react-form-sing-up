import classNames from 'classnames';
import ShowOutlineIcon from 'mdi-react/ShowOutlineIcon';
import HideOutlineIcon from 'mdi-react/HideOutlineIcon';
import React, { Component } from 'react';
import styles from './SignUpForm.module.css';

const INITIAL_VALUES = {
  email: '',
  password: '',
  userName: '',
  passwordConfirmation: '',
};
const USER_NAME_REG_EXPR = /^[A-Z][a-z]{3,8}(\d{1,5})?$/;
const EMAIL_REG_EXPR = /^\w{6,10}@\w{3,5}$/;
const PASSWORD_REG_EXPR = /^\w{3,5}[A-Z]\d{2}$/;

class SignUpForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userName: '',
      isUserNameValid: false,
      email: '',
      isEmailValid: false,
      password: '',
      isPasswordValid: false,
      isVisPassword: false,

      passwordConfirmation: '',
      isPasswordConfirmation: false,
      isVisPassConf: false,
    };
  }

  checkPassword = isVisPassword => {
    this.setState({ isVisPassword: !isVisPassword });
  };
  checkPasswordConf = isVisPassConf => {
    this.setState({ isVisPassConf: !isVisPassConf });
  };

  handleUserNameChange = ({ target: { value } }) => {
    this.setState({
      userName: value,
      isUserNameValid: USER_NAME_REG_EXPR.test(value),
    });
  };

  handleEmailChange = ({ target: { value } }) => {
    this.setState({ email: value, isEmailValid: EMAIL_REG_EXPR.test(value) });
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
      isPasswordValid: PASSWORD_REG_EXPR.test(value),
    });
  };

  handlePasswordConfirmationChebge = ({ target: { value } }) => {
    const { password } = this.state;
    this.setState({
      passwordConfirmation: value,
      isPasswordConfirmation: value === password,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(INITIAL_VALUES);
  };

  render () {
    const {
      userName,
      isUserNameValid,
      email,
      isEmailValid,
      password,
      isPasswordValid,
      passwordConfirmation,
      isPasswordConfirmation,
      isVisPassword,
      isVisPassConf,
    } = this.state;

    const userNameClassName = classNames(styles.input, {
      [styles.inputValid]: isUserNameValid,
      [styles.inputInvalid]: !isUserNameValid,
    });
    const emailClassName = classNames(styles.input, {
      [styles.inputValid]: isEmailValid,
      [styles.inputInvalid]: !isEmailValid,
    });
    const passwordClassName = classNames(styles.input, {
      [styles.inputValid]: isPasswordValid,
      [styles.inputInvalid]: !isPasswordValid,
    });
    const passwordConfirmationClassName = classNames(styles.input, {
      [styles.inputValid]: isPasswordConfirmation,
      [styles.inputInvalid]: !isPasswordConfirmation,
    });

    return (
      <form className={styles.formContainer} onSubmit={this.handleSubmit}>
        {/*  */}
        <label className={styles.label}>
          <span>Name</span>
          <input
            className={userNameClassName}
            value={userName}
            onChange={this.handleUserNameChange}
            type='text'
            name='userName'
            placeholder='name'
            autoFocus
          />
        </label>

        <label className={styles.label}>
          <span>Email</span>
          <input
            className={emailClassName}
            value={email}
            onChange={this.handleEmailChange}
            type='email'
            name='email'
            placeholder='email'
          />
        </label>

        <label className={styles.label}>
          <span>password</span>
          <input
            className={passwordClassName}
            value={password}
            onChange={this.handlePasswordChange}
            type={isVisPassword ? 'text' : 'password'}
            name='password'
            placeholder='password'
          />
          <span
            className={styles.spanPassword}
            onClick={() => this.checkPassword(isVisPassword)}
          >
            {isVisPassword ? <ShowOutlineIcon /> : <HideOutlineIcon />}
          </span>
        </label>

        <label className={styles.label}>
          <span>Password Confirmation</span>
          <input
            className={passwordConfirmationClassName}
            value={passwordConfirmation}
            onChange={this.handlePasswordConfirmationChebge}
            type={isVisPassConf ? 'text' : 'password'}
            name='passwordConfirmaton'
            placeholder='password'
          />
          <span
            className={styles.spanPasswordConf}
            onClick={() => this.checkPasswordConf(isVisPassConf)}
          >
            {isVisPassConf ? <ShowOutlineIcon /> : <HideOutlineIcon />}
          </span>
        </label>

        <button className={styles.btn} type='submit'>
          Login
        </button>
      </form>
    );
  }
}
export default SignUpForm;
