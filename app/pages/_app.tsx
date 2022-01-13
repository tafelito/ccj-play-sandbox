import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  ErrorBoundary,
} from 'blitz';
import LoginForm from 'app/auth/components/LoginForm';
import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return (
    <ChakraProvider>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <Suspense fallback="Loading...">
          {getLayout(<Component {...pageProps} />)}
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
