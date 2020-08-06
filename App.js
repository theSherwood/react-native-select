import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Select } from "./Select";

let options = "0"
  .repeat(150)
  .split("")
  .map((_, idx) => idx);

export default function App() {
  return (
    <View style={styles.container}>
      <Select options={options} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
