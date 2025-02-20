'use client';

import Link from 'next/link';
import {
  AlertBoxAction,
  AlertBoxCancel,
  AlertBoxDescription,
  AlertBoxFooter,
  AlertBoxHeader,
  AlertBox,
  AlertBoxTitle,
} from '../AlertBox';

type IntroTemaProps = {
  className?: string;
  title: string;
  desc: string;
  id: string;
};

export const IntroTema = ({ className, title, id, desc }: IntroTemaProps) => {
  return (
    <AlertBox
      popover='manual'
      id={id}
      className={className}
    >
      <AlertBoxHeader>
        <AlertBoxTitle>{title}</AlertBoxTitle>
        <AlertBoxDescription>{desc}</AlertBoxDescription>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction asChild>
          <Link href='/library'>Biblioteca</Link>
        </AlertBoxAction>
        <AlertBoxCancel
          popoverTarget={id}
          popoverTargetAction='hide'
        >
          OK
        </AlertBoxCancel>
      </AlertBoxFooter>
    </AlertBox>
  );
};
