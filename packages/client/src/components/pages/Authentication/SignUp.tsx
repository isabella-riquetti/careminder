import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

import SelfCareIcon from '@/assets/selfcare.svg?react';
import { SplitPane } from '@/components/atoms/SplitPane';

function SignUp() {
  return (
    <SplitPane imageIcon={<SelfCareIcon title="Person looking at the mirror" />}>
      <ClerkSignUp />
    </SplitPane>
  )
}

export default SignUp;
