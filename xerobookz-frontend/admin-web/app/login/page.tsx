"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@xerobookz/api-clients";
import { Button, Input, Card, XeroBookzLogo } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, Building } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authApi.login({
        email,
        password,
        tenant_id: tenantId,
      });

      if (result.success && result.data) {
        localStorage.setItem("xerobookz_token", result.data.access_token);
        localStorage.setItem("xerobookz_refresh_token", result.data.refresh_token);
        localStorage.setItem("xerobookz_tenant_id", tenantId);
        setAuth({
          token: result.data.access_token,
          user: { email },
        });
        router.push("/tenants");
      } else {
        setError(result.error?.details || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-grey-600 hover:text-secondary-800 mb-6"
          >
            ← Back to Home
          </Button>
        </div>
        <Card variant="default" className="p-8">
          <div className="text-center mb-8">
            <XeroBookzLogo size="xl" className="mb-6" />
            <h1 className="text-2xl font-semibold text-secondary-800 mb-2">
              Admin Portal
            </h1>
            <p className="text-grey-600 text-sm">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              icon={<Mail className="h-4 w-4 text-grey-400" />}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              icon={<Lock className="h-4 w-4 text-grey-400" />}
            />
            <Input
              label="Tenant ID"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              placeholder="Enter tenant ID"
              required
              icon={<Building className="h-4 w-4 text-grey-400" />}
            />

            {error && (
              <div className="p-3 rounded-lg bg-danger-50 border border-danger-200">
                <p className="text-danger-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              size="lg"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
