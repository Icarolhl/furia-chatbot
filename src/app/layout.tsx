import "./globals.css";

export const metadata = {
  title: "FURIA Chatbot",
  description: "Chat para fãs da FURIA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
