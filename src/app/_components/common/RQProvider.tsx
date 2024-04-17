'use client'

import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import{ ReactQueryDevtools } from "@tanstack/react-query-devtools" 

interface IProps {
    children: React.ReactNode
}

function RQProvider({children}:IProps){
    const [client] = useState(
        new QueryClient({
            defaultOptions:{
                queries: {
                    refetchOnWindowFocus: false,
                    retry: 1
                }
            }
        })
    )
    return(
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'}/>
        </QueryClientProvider>
    )
}

export default RQProvider