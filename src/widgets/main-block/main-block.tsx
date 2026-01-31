'use client';
import { UiButton } from '@common/ui';

export const MainBlock = () => {
  const handleClick = () => {
    alert('Hello World!');
  };

  return (
    <UiButton
      className='dafads'
      name='dasf'
      href='dasf'
      onClick={handleClick}
    >
      Hello
    </UiButton>
  );
};
