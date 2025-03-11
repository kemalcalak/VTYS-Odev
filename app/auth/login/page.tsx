"use client"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [loginError, setLoginError] = useState("")

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include' // Çerezler için önemli
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      return response.json()
    },
    onSuccess: () => {
      router.push("/profile")
    },
    onError: (error: Error) => {
      setLoginError(error.message)
    },
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (!value) {
      setEmailError("E-posta adresi gereklidir")
    } else if (!validateEmail(value)) {
      setEmailError("Lütfen geçerli bir e-posta adresi girin")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = () => {
    loginMutation.mutate({ email, password })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınıza giriş yapmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-posta</Label>
              <Input 
                id="email" 
                placeholder="kemalcalak@gmail.com" 
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <span className="text-sm text-destructive">{emailError}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </Button>
              </div>
            </div>
            {loginError && (
              <div className="text-sm text-destructive">{loginError}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            disabled={!!emailError || !password || !email || loginMutation.isPending}
            onClick={handleSubmit}
          >
            {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
          <div className="text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Hesap oluştur
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
