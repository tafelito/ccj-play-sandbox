import { ReactNode } from 'react';
import { Head, useSession } from 'blitz';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

// USING THE useSession HOOK here PREVENTS THE FLICKERING
// const Layout = ({ title, children }: LayoutProps) => {
//   const session = useSession();
//   return (
//     <>
//       <Head>
//         <title>{title || "codesandbox-template"}</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {session?.userId ? (
//         <>
//           <Navbar />
//           <Box p={4}>{children}</Box>
//         </>
//       ) : (
//         children
//       )}
//     </>
//   );
// };

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'codesandbox-template'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default Layout;
