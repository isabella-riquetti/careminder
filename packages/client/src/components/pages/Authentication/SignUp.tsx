import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

import SelfCareIcon from '@/assets/selfcare.svg?react';
import Container from "@/components/atoms/Container";
import Header from "@/components/atoms/Header";
import Main from "@/components/atoms/Main";
import { SplitPane } from '@/components/atoms/SplitPane';

function SignUp() {

  return (
    <Container>
      <Header />
      <Main>
        <SplitPane imageIcon={<SelfCareIcon title="Person looking at the mirror" />}>
          <ClerkSignUp />
        </SplitPane>
      </Main>
    </Container>
  )
}

export default SignUp;
