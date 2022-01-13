import React from "react";
import { BlitzPage, useMutation, useQuery, useSession } from "blitz";
import { Heading, VStack, IconButton, Text } from "@chakra-ui/react";

import Layout from "app/core/layouts/Layout";
import getFirstDataQuery from "app/monitors/queries/getFirstData";

const FirstData = () => {
  const session = useSession();
  const [data, { isFetching, refetch }] = useQuery(getFirstDataQuery, null, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: Boolean(session.userId)
  });
  return (
    <VStack>
      {data?.map((value, i) => {
        return <Text key={i}>{value}</Text>;
      })}
    </VStack>
  );
};

const FirstMonitor: BlitzPage = () => {
  return (
    <main>
      {/* <Suspense fallback="Loading..."> */}
      <Heading mb={4}>First Monitor</Heading>
      <FirstData />
      {/* </Suspense> */}
    </main>
  );
};

FirstMonitor.authenticate = true;
// MeatMonitor.authenticate = { redirectTo: "/login" }
FirstMonitor.getLayout = (page) => <Layout title="First">{page}</Layout>;

export default FirstMonitor;
