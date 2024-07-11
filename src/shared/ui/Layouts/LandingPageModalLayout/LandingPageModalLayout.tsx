import React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export const LandingPageModalLayout = ({ children }: LayoutProps) => {
    return (
        <div className='col-span-6 col-start-2 grid grid-cols-1 gap-8'>
            <div className='bg-viat-wh p-8 rounded-md'>{children}</div>
            <div className='flex items-center justify-center'>
            </div>
        </div>
    )
}