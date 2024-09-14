'use client'

import { Container, Header } from "@/shared/components/shared"

  
  export default function CheckoutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="min-h-screen">
        <Header hasCart={false} hasSearch={false} className="border-slate-900"/>
        <Container>
            {children}
        </Container>
      </main>
    )
  }
  