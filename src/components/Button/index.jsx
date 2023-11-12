/* eslint-disable react/prop-types */
import { Container } from "./styles";

export default function Button({ title, loading = false, ...rest }) {

  return (
    <Container type="button" disabled={loading} {...rest}>
      {loading ? "Carregando..." : title}
    </Container>
  );
}
