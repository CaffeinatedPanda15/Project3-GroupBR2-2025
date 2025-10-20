import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SignUpPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>Choose your registration type:</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/Screens/ParentRegistration")}
                >
                    <Text style={styles.btnText}>Parent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/Screens/DriverRegistration")}
                >
                    <Text style={styles.btnText}>Driver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/Screens/NannyRegistration")}
                >
                    <Text style={styles.btnText}>Nanny</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 12, color: "#1D2A32" },
    subtitle: { fontSize: 16, fontWeight: "500", marginBottom: 24, color: "#929292" },
    buttonContainer: { width: "100%" },
    btn: { backgroundColor: "#C743A2", paddingVertical: 14, borderRadius: 30, marginBottom: 16, alignItems: "center" },
    btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
