import { BlitzPage, Routes, useMutation, useRouter } from 'blitz';
import React, { Suspense, useState } from 'react';
import logout from 'app/auth/mutations/logout';
import Layout from 'app/core/layouts/Layout';
import { Container, Box } from '@chakra-ui/react';

const AccountPage: BlitzPage = () => {
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);

  return (
    <Container maxW="xl" centerContent>
      <Box padding="4" bg="gray.100" maxW="3xl">
        There are many benefits to a joint design and development system. Not
        only does it bring benefits to the design team.
      </Box>
    </Container>
  );
};

AccountPage.authenticate = { redirectTo: '/' };
AccountPage.getLayout = (page) => <Layout title="Account">{page}</Layout>;

export default AccountPage;
