'use client'
import { SessionProvider } from "next-auth/react";

const ProvidersGoogle = ({children}: {children: React.ReactNode}) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default ProvidersGoogle;