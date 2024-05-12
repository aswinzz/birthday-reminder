"use client"
import { Header } from "@/components/header"
import { Item } from "@/components/item"
import { AddItem } from "@/components/addItem"
import { AuthProvider } from "@/context/AuthContext"
import { Items } from "@/components/items"

export default function Page() {
  return (
    <AuthProvider>
      <Header />
      <main className="container mx-auto my-8 space-y-6 px-4">
        <Items />
      </main>
      <AddItem />
    </AuthProvider>
  )
}
