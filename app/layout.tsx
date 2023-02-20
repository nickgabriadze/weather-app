"use client"
import { Provider } from 'react-redux'
import { weatherStore } from './(store)/store'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
       <Provider store={weatherStore}>
        {children}
        </Provider>
        
        </body>
    </html>
  )
}
