import { SignIn as ClerkLogin } from "@clerk/clerk-react";

import SelfCareIcon from '@/assets/selfcare.svg?react';
import Container from "@/components/atoms/Container";
import Header from "@/components/atoms/Header";
import Main from "@/components/atoms/Main";
import { SplitPane } from '@/components/atoms/SplitPane';

function Login() {
  return (
    <Container>
      <Header />
      <Main>
        <SplitPane imageIcon={<SelfCareIcon title="Person looking at the mirror" />}>
          <ClerkLogin redirectUrl="dashboard" />
        </SplitPane>
      </Main >
    </Container>
  )
}

export default Login
