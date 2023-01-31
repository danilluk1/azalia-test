import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="relative h-15 bg-slate-600 flex">
      <Link href="/numbers" className="mr-8">
        Числа
      </Link>
      <Link href="/advertisings" className="mr-8">
        Доска сообщений
      </Link>
      <Link href="https://github.com/danilluk1/azalia-test">Гитхаб</Link>
    </header>
  );
};

export default Header;
