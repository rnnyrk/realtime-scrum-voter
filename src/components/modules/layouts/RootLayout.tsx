import Link from 'next/link';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="min-h-full min-w-full">
      <ul className="w-full flex justify-center py-8 mb-10">
        <li>
          <Link href="/">About</Link>
        </li>
        <li className="mx-4">
          <Link href="/work">Work</Link>
        </li>
        <li>
          <Link href="/cv">Cv</Link>
        </li>
      </ul>
      <main className="max-w-4xl mx-auto">{children}</main>
    </body>
  );
};
