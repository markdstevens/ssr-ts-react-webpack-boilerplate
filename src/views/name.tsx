import React, { FC } from 'react';
import { useNameStore } from 'platform/stores/src/name-store/useNameStore';
import { Link } from 'react-router-dom';

const Name: FC = () => {
  const [nameStoreState] = useNameStore();

  return (
    <>
      <Link to="/name/home">home</Link>
      <ul>
        {nameStoreState.items?.map((item, index) => (
          <li key={`item-${index}`}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Name;
