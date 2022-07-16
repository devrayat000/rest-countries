import Header from "$lib/components/header";
import type { AppProps } from "next/app";
import {
  type DehydratedState,
  Hydrate,
  QueryClientProvider,
} from "react-query";

import rqClient from "../lib/modules/rq-client";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: MyAppProps) {
  return (
    <QueryClientProvider client={rqClient} contextSharing>
      <Hydrate state={dehydratedState}>
        <div className="prose max-w-none bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
          <Header />
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState?: DehydratedState;
  };
}

export default MyApp;
