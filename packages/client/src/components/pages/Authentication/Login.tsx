import { SignIn as ClerkLogin } from "@clerk/clerk-react";

import SelfCareIcon from '@/assets/selfcare.svg?react';
import { SplitPane } from '@/components/atoms/SplitPane';

function Login() {
  return (
    <SplitPane imageIcon={<SelfCareIcon title="Person looking at the mirror" />}>
      <ClerkLogin />      
    </SplitPane>
  )
}

export default Login
