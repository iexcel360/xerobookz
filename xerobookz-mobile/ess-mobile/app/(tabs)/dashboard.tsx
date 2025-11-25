import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function DashboardScreen() {
  const alerts = [
    { type: "Document", message: "Passport expiring in 30 days", urgent: true },
    { type: "Timesheet", message: "Timesheet pending submission", urgent: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {alerts.map((alert, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>{alert.type}</Text>
            <Text style={styles.cardText}>{alert.message}</Text>
            {alert.urgent && (
              <Text style={styles.urgentBadge}>Urgent</Text>
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F7",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1F26",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1F26",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
  },
  urgentBadge: {
    color: "#FF4D4F",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
});

