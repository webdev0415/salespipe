import { authMiddleware } from 'redux/auth/auth-middleware';
import { profileMiddleware } from 'redux/profiles/profile-middleware';

const middleware = [authMiddleware, profileMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(logger);
}

export { middleware };
