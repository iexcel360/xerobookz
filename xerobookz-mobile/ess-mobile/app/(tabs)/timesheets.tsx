import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useGetTimesheets } from "@xerobookz/api-clients";

export default function TimesheetsScreen() {
  const { data: timesheetsData, isLoading } = useGetTimesheets();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Timesheets</Text>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text>Loading timesheets...</Text>
      ) : (
        timesheetsData?.data?.map((ts: any) => (
          <Card key={ts.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.period}>
                {ts.period_start} - {ts.period_end}
              </Text>
              <Text style={styles.hours}>{ts.total_hours} hours</Text>
              <Text style={styles.status}>{ts.status}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1F26",
  },
  submitButton: {
    backgroundColor: "#2A7FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  period: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1F26",
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: "#2A7FFF",
    fontWeight: "600",
  },
});

