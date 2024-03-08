import { auth } from "./auth"
import { defaultLoginRedirect, apiAuthPrefix, authRoutes, publicRoutes } from "./routes"

export default auth((req) => {
  console.log('\n\n\n\n****************')
  const { nextUrl } = req;
  console.log('auth details for ' + req.url, req.auth)
  const isLoggedIn = !!req.auth

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPubliRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  console.log(isApiRoute, isPubliRoute, isAuthRoute, isLoggedIn)

  if (isApiRoute) {
    console.log('ALLOW API route')
    return;
  }

  if (isAuthRoute) {

    console.log('AUTH ROUTE')
    if (isLoggedIn) {

      console.log('LOGGED IN')
      const url = new URL('/settings', req.url)
      console.log('SENDING TO SETTINGS')
      return Response.redirect(url)
    }

    return;
  }

  if (!isLoggedIn && !isPubliRoute) {
    const url = new URL('/auth/login', req.url)

    console.log('TRYING TO ACCESS PROTECTED BUT NOT LOGGED')

    return Response.redirect(url)

  }

  console.log('PUBLIC ROUTE')

  return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
