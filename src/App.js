import React from 'react';
import './styles/App.less';
import AppRouter from './appRouter';
import {connect} from 'react-redux';

function App(props) {
  const {location} = props;
  if (typeof location?.pathname !== 'string') return <div>oops no pathname in store</div>;

  return (
    <div className={`App ${location.pathname.match(/sign_in/gm) ? `grd` : `blue_background`}`}>
      <AppRouter />
    </div>
  );
}

export default connect(
  ({router: {location}}) => ({
    location
  })
)(App);
