import React from 'react';
import Link from 'next/link';

type GameModeCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function GameModeCard({ title, description, href }: GameModeCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href}>
        <button>{title}</button>
      </Link>
    </div>
  );
} 