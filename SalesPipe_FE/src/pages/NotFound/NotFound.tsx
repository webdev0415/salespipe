import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.less';

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  //   useEffect(() => {
  //     if (history?.location?.pathname === "/") {
  //       history.push("/dashboard/cars")
  //     }
  //   }, [history])

  return <h3 className="heading1">Not Found Page.</h3>;
};

export default NotFoundPage;
