import React from "react";
import { Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  weight?: "regular" | "medium" | "bold";
};

export default function ThemedText({ style, weight = "regular", ...props }: ThemedTextProps) {
  let fontFamily = "Montserrat_400Regular";
  if (weight === "medium") fontFamily = "Montserrat_500Medium";
  if (weight === "bold") fontFamily = "Montserrat_700Bold";

  return <Text {...props} style={[{ fontFamily, color: "#fff" }, style]} />;
}