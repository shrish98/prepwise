'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error natively to the browser console
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-title">Something went wrong!</h2>
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-md mb-6 max-w-2xl text-left overflow-auto">
                <p className="text-red-500 font-mono text-sm">{error.message || error.toString()}</p>
            </div>
            <Button onClick={() => reset()} variant="default">
                Try again
            </Button>
        </div>
    )
}
