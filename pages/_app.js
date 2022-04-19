import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import "../assets/tailwind.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
