"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import LanguageSelector from "@/components/language-selector"
import LoginAvatar from "@/components/login-avatar"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [age, setAge] = useState("")
  const [religion, setReligion] = useState("")
  const [emergencyContactName, setEmergencyContactName] = useState("")
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("")

  const router = useRouter()
  const { login, signup, continueAsGuest } = useAuth()
  const { t, language, setLanguage } = useTranslation()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")

    try {
      await login(loginEmail, loginPassword)
      router.push("/")
    } catch (error) {
      setFormError(t("login_error"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")

    if (password !== confirmPassword) {
      setFormError(t("password_mismatch"))
      setIsLoading(false)
      return
    }

    try {
      await signup({
        name,
        email,
        password,
        age: Number.parseInt(age),
        religion,
        emergencyContact: {
          name: emergencyContactName,
          phone: emergencyContactPhone,
        },
      })
      router.push("/")
    } catch (error) {
      setFormError(t("signup_error"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestAccess = () => {
    continueAsGuest()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} darkMode={false} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
            {t("app_name")}
          </h1>
          <p className="text-gray-600">{t("app_tagline")}</p>
        </div>

        <LoginAvatar activeTab={activeTab} />

        <Card className="p-6 shadow-lg">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t("login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("email_placeholder")}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("password_placeholder")}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                {formError && <p className="text-red-500 text-sm">{formError}</p>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                  disabled={isLoading}
                >
                  {isLoading ? t("logging_in") : t("login")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("full_name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("name_placeholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("email")}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t("email_placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t("password")}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={t("password_placeholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder={t("confirm_password_placeholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t("age")}</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder={t("age_placeholder")}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="religion">{t("religion")}</Label>
                    <Input
                      id="religion"
                      placeholder={t("religion_placeholder")}
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t("emergency_contact")}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder={t("emergency_name_placeholder")}
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder={t("emergency_phone_placeholder")}
                      value={emergencyContactPhone}
                      onChange={(e) => setEmergencyContactPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {formError && <p className="text-red-500 text-sm">{formError}</p>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                  disabled={isLoading}
                >
                  {isLoading ? t("signing_up") : t("signup")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" className="w-full" onClick={handleGuestAccess}>
              {t("continue_as_guest")}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

