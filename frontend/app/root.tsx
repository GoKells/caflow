import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "./components/theme/provider";
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Alert, AlertDescription } from "./components/ui/alert"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  <Outlet />;
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="caflow-ui-theme"
    >
      <Outlet/>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined
  let is404 = false

  // Check if it's a route error response (assuming similar structure)
  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404
    message = is404 ? "Page Not Found" : "Error"
    details = is404 ? "The requested page could not be found." : error.statusText || details
  } else if (error && error instanceof Error) {
    details = error.message
    if (process.env.NODE_ENV === "development") {
      stack = error.stack
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">{is404 ? "404" : message}</CardTitle>
          <CardDescription className="text-lg">{details}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRefresh} variant="default" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          {stack && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <details className="mt-2 max-w-2xl">
                  <summary className="cursor-pointer font-medium mb-2">View Error Details</summary>
                  <pre className="mt-2 p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap max-w-full">
                    <code>{stack}</code>
                  </pre>
                </details>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
