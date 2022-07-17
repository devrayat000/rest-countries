import { QueryCache, QueryClient, QueryClientConfig } from "react-query";

export function createQueryClient(opts?: QueryClientConfig) {
  return new QueryClient({
    queryCache: opts?.queryCache,
    mutationCache: opts?.mutationCache,
    defaultOptions: {
      mutations: opts?.defaultOptions?.mutations,
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: process.env.NODE_ENV === "production",
        ...opts?.defaultOptions?.queries,
      },
    },
  });
}

export const queryCache = new QueryCache();
export default createQueryClient({ queryCache });
