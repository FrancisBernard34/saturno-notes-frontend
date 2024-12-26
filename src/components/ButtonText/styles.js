import styled from "styled-components";

export const Container = styled.button`
  background: none;
  color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

  border: none;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 20px; // Increased font size for mobile
  }
`;
