import { SessionProvider } from "next-auth/react";


export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div>
        {children}
      </div >
    </SessionProvider>
  );
}
