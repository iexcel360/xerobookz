import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@xerobookz/api-clients";

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");

  const handleLogin = async () => {
    try {
      const result = await loginMutation.mutateAsync({
        email,
        password,
        tenant_id: tenantId,
      });

      if (result.success && result.data) {
        // Store tokens
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        await AsyncStorage.setItem("xerobookz_token", result.data.access_token);
        await AsyncStorage.setItem("xerobookz_refresh_token", result.data.refresh_token);
        await AsyncStorage.setItem("xerobookz_tenant_id", tenantId);
        router.push("/(tabs)/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>XeroBookz</Text>
      <Text style={styles.subtitle}>Employee Self Service</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Tenant ID"
        value={tenantId}
        onChangeText={setTenantId}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F3F5F7",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2A7FFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#1C1F26",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2A7FFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

