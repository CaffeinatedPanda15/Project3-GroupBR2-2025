import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function DriverRegistration() {
    const router = useRouter();

    const [form, setForm] = useState({
        driverName: "",
        driverSurname: "",
    });

    const registerDriver = async () => {
        const driverData = { driverName: form.driverName, driverSurname: form.driverSurname };

        try {
            const response = await fetch("http://<YOUR_SERVER_IP>:8080/api/driver/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(driverData),
            });

            if (response.ok) {
                Alert.alert("Success", "Driver registered successfully!");
                router.push("/login");
            } else {
                Alert.alert("Error", "Registration failed!");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "An error occurred!");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Register Driver</Text>

            <TextInput placeholder="First Name" style={styles.input} value={form.driverName} onChangeText={(text) => setForm({ ...form, driverName: text })} />
            <TextInput placeholder="Surname" style={styles.input} value={form.driverSurname} onChangeText={(text) => setForm({ ...form, driverSurname: text })} />

            <TouchableOpacity style={styles.btn} onPress={registerDriver}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
    input: { borderWidth: 1, borderColor: "#C9D3DB", borderRadius: 12, padding: 12, marginBottom: 12 },
    btn: { backgroundColor: "#C743A2", padding: 14, borderRadius: 30, alignItems: "center", marginTop: 10 },
    btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
