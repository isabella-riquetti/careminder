import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import sidePanel from '@/assets/side-panel.jpg';
import { SplitPane } from '@/components/atoms/SplitPane';

function SignUp() {
  return (
    <SplitPane imgUrl={sidePanel} alt="Person in a towel login at the mirror">
      <ClerkSignUp />
    </SplitPane>
  )
}

export default SignUp;
