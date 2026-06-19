import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
const session = await auth.api.getSession({
    headers: await headers()
})
 if(session?.user?.role == "donor" && session?.user?.plan === "free") {
    return NextResponse.redirect(new URL('/funding', request.url))
   }

   if(!session){
    return NextResponse.redirect(new URL('/signin', request.url))
   }
}
 
export const config = {
  matcher: ['/profile' ,'/dashboard/donor']
}