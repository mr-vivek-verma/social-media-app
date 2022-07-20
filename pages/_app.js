import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
