import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useGetEmployeeDocuments } from "@xerobookz/api-clients";

export default function DocumentsScreen() {
  const employeeId = "employee-id"; // Get from auth
  const { data: documentsData, isLoading } = useGetEmployeeDocuments(employeeId);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Documents</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text>Loading documents...</Text>
      ) : (
        documentsData?.data?.map((doc: any) => (
          <Card key={doc.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.docName}>{doc.filename}</Text>
              <Text style={styles.docType}>{doc.document_type}</Text>
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
  uploadButton: {
    backgroundColor: "#2A7FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "600",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  docName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1F26",
    marginBottom: 4,
  },
  docType: {
    fontSize: 14,
    color: "#666",
  },
});

