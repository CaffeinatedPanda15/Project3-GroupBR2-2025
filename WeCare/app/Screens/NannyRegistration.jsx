import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function NannyRegistration() {
    const router = useRouter();

    const [form, setForm] = useState({
        nannyName: "",
        nannySurname: "",
        contactType: "phone",
        contactValue: "",
        street: "",
        city: "",
        postalCode: "",
    });

    const registerNanny = async () => {
        const nannyData = {
            nannyName: form.nannyName,
            nannySurname: form.nannySurname,
            contacts: [{ type: form.contactType, value: form.contactValue }],
            addresses: [{ street: form.street, city: form.city, postalCode: form.postalCode }],
        };

        try {
            const response = await fetch("http://<YOUR_SERVER_IP>:8080/api/nanny/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nannyData),
            });

            if (response.ok) {
                Alert.alert("Success", "Nanny registered successfully!");
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
            <Text style={styles.title}>Register Nanny</Text>

            <TextInput placeholder="First Name" style={styles.input} value={form.nannyName} onChangeText={(text) => setForm({ ...form, nannyName: text })} />
            <TextInput placeholder="Surname" style={styles.input} value={form.nannySurname} onChangeText={(text) => setForm({ ...form, nannySurname: text })} />
            <TextInput placeholder="Contact (phone/email)" style={styles.input} value={form.contactValue} onChangeText={(text) => setForm({ ...form, contactValue: text })} />
            <TextInput placeholder="Street" style={styles.input} value={form.street} onChangeText={(text) => setForm({ ...form, street: text })} />
            <TextInput placeholder="City" style={styles.input} value={form.city} onChangeText={(text) => setForm({ ...form, city: text })} />
            <TextInput placeholder="Postal Code" style={styles.input} value={form.postalCode} onChangeText={(text) => setForm({ ...form, postalCode: text })} />

            <TouchableOpacity style={styles.btn} onPress={registerNanny}>
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
