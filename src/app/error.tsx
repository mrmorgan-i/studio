
'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error("Unhandled error in ErrorPage boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/20 p-4">
      <Card className="max-w-lg w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-semibold text-destructive">
            Oops! Something went wrong.
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4 text-lg">
            We've encountered an unexpected issue. Please try again.
          </p>
          {process.env.NODE_ENV === 'development' && error?.message && (
            <div className="mt-4 p-3 bg-muted/50 border border-destructive/30 rounded-md text-left text-sm">
              <p className="font-semibold text-destructive">Error Details (Development Mode):</p>
              <pre className="whitespace-pre-wrap break-all text-destructive/80">{error.message}</pre>
              {error.digest && (
                 <p className="mt-2 text-xs">Digest: {error.digest}</p>
              )}
            </div>
          )}
           {process.env.NODE_ENV !== 'development' && error?.digest && (
             <p className="text-xs text-muted-foreground mt-4">
              If the problem persists, please contact support with error code: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => reset()}
            variant="destructive"
            size="lg"
            className="transition-all duration-300 ease-in-out hover:shadow-destructive/50 hover:scale-105 active:scale-100"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
       <footer className="text-center py-8 mt-auto text-muted-foreground/80">
        <p>&copy; {new Date().getFullYear()} Photo Poet. We'll get this sorted!</p>
      </footer>
    </div>
  );
}
