import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  asyncSignupPrepareConfirm,
  AuthLoadingId,
  TOKEN_EMAIL
} from 'redux/auth/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import './SignUp.less';
import { Redirect } from 'react-router-dom';

type QuizParams = {
  code: string;
};

const SignUpConfirm: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, prepareConfirmSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  const { code } = useParams<QuizParams>();
  const queryString = window.location.search;
  const qs = new URLSearchParams(queryString);
  const email = qs.get('email');

  useEffect(() => {
    if (email !== null) {
      localStorage.setItem(TOKEN_EMAIL, email);
      dispatch(asyncSignupPrepareConfirm({ email, code }));
    }
  }, []);

  return (
    <div className="confirm-panel">
      {loading.includes(AuthLoadingId.SIGNUP_PREPARE_CONFIRM) &&
        !prepareConfirmSuccess && <h2>Confirming...</h2>}
      {!loading.includes(AuthLoadingId.SIGNUP_PREPARE_CONFIRM) &&
        !prepareConfirmSuccess && <h2>Unconfirmed. Please ask the admin.</h2>}
      {!loading.includes(AuthLoadingId.SIGNUP_PREPARE_CONFIRM) &&
        prepareConfirmSuccess && (
          <div>
            <h2>Confirmed successfully.</h2>
            <Redirect to="/set-password" push />
          </div>
        )}
    </div>
  );
};

export default SignUpConfirm;
