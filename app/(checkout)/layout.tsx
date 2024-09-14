'use client'

import { Container, Header } from "@/shared/components/shared"
import { Suspense } from "react"

  
  export default function CheckoutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="min-h-screen">
        <Suspense>
          <Header hasCart={false} hasSearch={false} className="border-slate-900"/>
        </Suspense>
        <Container>
            {children}
        </Container>
      </main>
    )
  }
  