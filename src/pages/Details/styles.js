import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 32px;
  }

  @media (max-width: 768px) {
    > main {
      padding: 32px 16px;
    }
  }
`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px; 

    @media (max-width: 768px) {
      font-size: 28px;
      padding-top: 32px;
    }
  }

  > p {
    font-size: 16px;
    margin-top: 16px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  .delete-button {
    align-self: center;
    margin-top: 32px;
    color: ${({ theme }) => theme.COLORS.RED};
    background: none;
    
    &:hover {
      color: #FF4D4D; /* Brighter red on hover */
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-top: 24px;
    }
  }
`;