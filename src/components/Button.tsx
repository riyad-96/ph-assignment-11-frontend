import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { To } from 'react-router-dom';

type ButtonPropsType = {
  onClick?: () => void;
  to?: To;
  content: ReactNode;
};

export default function Button({ onClick, to }: ButtonPropsType) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (to) navigate(to);
        if (typeof onClick === 'function') onClick();
      }}
    >
      Button
    </button>
  );
}
