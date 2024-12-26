import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const MenuContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  padding: 24px;
  
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
