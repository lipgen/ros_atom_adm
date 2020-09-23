import React from 'react';
import RosAtomLogo from '../RosAtomLogo'
import AdminForm from '../AdminForm';
import {useHistory} from 'react-router'

function SignIn() {
  console.log(useHistory());
  
  return (
    <>
      <RosAtomLogo />
      <AdminForm />
    </>
  );
}

export default SignIn;
