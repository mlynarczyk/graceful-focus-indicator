import React, { useEffect } from 'react';
import { css } from 'styled-components';

const handlers = {
  handleTabOnce: (keyboardEvent: KeyboardEvent): void => {
    if (keyboardEvent.key === 'Tab' || keyboardEvent.keyCode === 9) {
      document!.body.classList.add('is-keyboard-focused');
      document!.removeEventListener('keydown', handlers.handleTabOnce);
      document!.addEventListener('mousedown', handlers.handleMouseDownOnce);
    }
  },
  handleMouseDownOnce: (): void => {
    document!.body.classList.remove('is-keyboard-focused');
    document!.removeEventListener('mousedown', handlers.handleMouseDownOnce);
    document!.addEventListener('keydown', handlers.handleTabOnce);
  },
};

// This component removes default focus indicator for mouse users, and
//  enables it only for keyboard users.
//  More info: https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
export const GracefulFocusOutline: React.FC = () => {
  useEffect(() => {
    document!.addEventListener('keydown', handlers.handleTabOnce);

    return () => {
      document!.body.classList.remove('is-keyboard-focused');

      document!.removeEventListener('keydown', handlers.handleTabOnce);
      document!.removeEventListener('mousedown', handlers.handleMouseDownOnce);
    };
  });

  return null;
};

export const GracefulFocusOutlineCSS = css`
  /* Disabling focus outline for non-keyboard users */
  *:focus {
    outline: none;
  }

  /* Enabling focus indicator for keyboard users */
  body.is-keyboard-focused *:focus {
    outline: 2px solid #7aacfe; /* for non-webkit browsers */
    outline: 5px auto -webkit-focus-ring-color;
  }
`;
