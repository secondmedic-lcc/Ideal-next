import "./globals.css";
import "./media.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";

export const metadata = {
  title: "Ideal Education | Evolved Learning",
  description: "The Future Of Learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
