/* eslint-disable react/prop-types */
import { Container } from "./styles";

export default function ButtonText({ title, $isactive = false, ...rest }) {
  return (
    <Container type="button" $isactive={$isactive} {...rest}>
      {title}
    </Container>
  );
}