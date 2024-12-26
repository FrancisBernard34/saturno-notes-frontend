import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Container, MenuButton, MenuContent } from './styles';

export function MobileMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MenuButton>

      <MenuContent isOpen={isOpen}>
        {children}
      </MenuContent>
    </Container>
  );
}

MobileMenu.propTypes = {
  children: PropTypes.node.isRequired
};
