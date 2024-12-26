import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 105px 128px auto 80px;
  grid-template-areas:
    "brand header"
    "menu search"
    "menu content"
    "newnote content";

  background-color: ${(props) => props.theme.COLORS.BACKGROUND_800};

  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-rows: 70px auto auto 1fr 80px;
    grid-template-areas:
      "brand"
      "header"
      "search"
      "content"
      "newnote";
    
    /* Menu will be handled by a separate mobile menu component */
    .menu {
      display: none;
    }
  }
`;

export const Brand = styled.div`
  grid-area: brand;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.COLORS.BACKGROUND_700};

  background-color: ${(props) => props.theme.COLORS.BACKGROUND_900};

  > h1 {
    font-size: 24px;
    color: ${(props) => props.theme.COLORS.ORANGE};
  }

  @media (max-width: 768px) {
    > h1 {
      font-size: 20px;
    }
  }
`;

export const Menu = styled.ul`
  grid-area: menu;

  background-color: ${(props) => props.theme.COLORS.BACKGROUND_900};

  padding-top: 64px;
  text-align: center;

  > li {
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    display: none; /* Hide the default menu on mobile */
  }
`;

export const Search = styled.div`
  grid-area: search;
  padding: 64px 64px 0;

  @media (max-width: 768px) {
    padding: 24px 16px 0;
  }
`;

export const Content = styled.div`
  grid-area: content;
  padding: 0 64px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0 16px;
    margin-bottom: 16px;
  }
`;

export const NewNote = styled(Link)`
  grid-area: newnote;

  background-color: ${(props) => props.theme.COLORS.ORANGE};
  color: ${(props) => props.theme.COLORS.BACKGROUND_900};
  border: none;
  font-weight: 500;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  > svg {
    font-size: 20px;
  }

  &:hover {
    background-color: ${(props) => props.theme.COLORS.ORANGE_DARK || '#FF6B21'};
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    font-size: 18px;
    
    > svg {
      font-size: 24px;
    }
  }
`;
