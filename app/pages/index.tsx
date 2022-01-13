import React from 'react';
import { BlitzPage, getSession } from 'blitz';

import Layout from 'app/core/layouts/Layout';

const Home: BlitzPage = () => {
  return <div>Home</div>;
};

// export const getServerSideProps = async ({ req, res }) => {
//   const session = await getSession(req, res);

//   if (!session.userId) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false
//       }
//     };
//   }

//   return {
//     redirect: {
//       destination: "/monitors/first",
//       permanent: false
//     }
//   };
// };

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const publicData = session.$publicData;

  return {
    props: {
      publicData,
    },
  };
};

Home.suppressFirstRenderFlicker = true;

// Home.authenticate = true
// // Home.authenticate = { redirectTo: "/login" }
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
