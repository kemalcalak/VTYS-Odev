import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for login and registration",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}