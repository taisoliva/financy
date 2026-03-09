import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuthStore } from "@/stores/auth";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const isTokenExpired = (token: string) => {
  try {
    const [, payload] = token.split('.');
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token
  
  if (token && isTokenExpired(token)) {
    useAuthStore.getState().logout();
    return prevContext;
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError((error: any) => {
  console.log("🔴 [Apollo Link] Erro detectado:", error);
  const { graphQLErrors, networkError } = error;
  
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.log("🔍 [Apollo GraphQL Error]:", err.message, err.extensions?.code);
      
      const isUnauthorized = 
        err.message?.toLowerCase().includes("unauthorized") || 
        err.extensions?.code === "UNAUTHENTICATED" ||
        err.extensions?.code === "FORBIDDEN" ||
        err.extensions?.response?.statusCode === 401;

      if (isUnauthorized) {
        console.warn("🔐 Sessão inválida ou expirada. Deslogando...");
        useAuthStore.getState().logout();
      }
    }
  }

  if (networkError) {
    console.log("🌐 [Apollo Network Error]:", networkError);
    if ((networkError as any).statusCode === 401) {
      console.warn("🌐 Erro de rede 401. Deslogando...");
      useAuthStore.getState().logout();
    }
  }
});

console.log("🚀 [Apollo] Inicializando apolloClient...");

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
