import { Container } from "@mui/material";
import { PropsWithChildren } from "react";
import Header from "./Header";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Page;
