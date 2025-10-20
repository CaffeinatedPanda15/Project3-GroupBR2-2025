// screens/NannyRegistration.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function NannyRegistration() {
    const [form, setForm] = useState({ name: "", surname: "", email: "", password: "" });

    const handleRegister = async () => {
        if (!form.name || !form.surname || !form.email || !form.password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("https://your-backend-domain.com/api/nannies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                Alert.alert("Success", "Nanny registered successfully!");
                setForm({ name: "", surname: "", email: "", password: "" });
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Registration failed");
            }
        } catch {
            Alert.alert("Error", "Network error");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nanny Registration</Text>

            <TextInput style={styles.input} placeholder="Name" value={form.name} onChangeText={(name) => setForm({ ...form, name })} />
            <TextInput style={styles.input} placeholder="Surname" value={form.surname} onChangeText={(surname) => setForm({ ...form, surname })} />
            <TextInput style={styles.input} placeholder="Email" value={form.email} keyboardType="email-address" autoCapitalize="none" onChangeText={(email) => setForm({ ...form, email })} />
            <TextInput style={styles.input} placeholder="Password" value={form.password} secureTextEntry onChangeText={(password) => setForm({ ...form, password })} />

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 24, textAlign: "center" },
    input: { height: 50, borderColor: "#C9D3DB", borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, fontSize: 16 },
    btn: { backgroundColor: "#C743A2", paddingVertical: 14, borderRadius: 30, alignItems: "center" },
    btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
