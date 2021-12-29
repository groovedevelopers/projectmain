import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";


function MyApp({ Component, pageProps }) {
  const links = [
    {
      label: "Home",
      href: "/home",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "Search Receipe",
      href: "/findrecipe",
    },
  ];
  return (
    <ChakraProvider>
      <div className="app-root">
        <header  >

    
          <ul style={{listStyle: 'none', 'display': 'flex', gap: '20px' , justifyItems: 'flex-end',}}>
            {links.map(item => <li key={item.href}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>)}
           
          
          </ul>
        </header>

        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
