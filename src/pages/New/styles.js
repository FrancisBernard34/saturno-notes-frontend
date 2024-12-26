import styled from "styled-components";

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
    overflow-y: auto;
    padding: 0 32px;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin: 24px 0;
    padding: 16px;
    background-color: ${(props) => props.theme.COLORS.BACKGROUND_900};
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    > main {
      padding: 0 16px;
    }
  }
`;

export const Form = styled.form`
  max-width: 550px;
  margin: 38px auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 36px;

    a {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      font-size: 20px;
      color: ${(props) => props.theme.COLORS.GRAY_100};
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        color: ${(props) => props.theme.COLORS.ORANGE};
      }
    }
  }

  > textarea {
    margin: 16px 0;
  }

  @media (max-width: 768px) {
    margin: 24px auto;
    padding: 0 8px;

    > header {
      margin-bottom: 24px;
    }
  }
`;
