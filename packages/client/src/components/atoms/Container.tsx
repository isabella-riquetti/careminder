import React from 'react'

export default function Container({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<div className="antialiased w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 font-sans">
        {children}
    </div>)
}