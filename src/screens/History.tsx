import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { colors } from "../constants/color";

const History = ({ navigation }) => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("My")}>
          <Image source={require("../assets/left-arrow.png")} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>To’lovlar tarixi</Text>
        <View></View>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text
              style={{
                color: colors.davysGrey,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Hisobni to'ldirish
            </Text>
            <Text
              style={{
                color: colors.neonGreen,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              +50 000 so’m
            </Text>
          </View>
          <Text>
            Sizning hisobingiz toldirildi, siz ushbu pullarni faqat bizning
            ilovamizda ishlata olasiz shuning dek ushbu pullar o’z hisobingizda
            saqlanadi.
          </Text>
          <View style={{ marginTop: 4, flexDirection: "row-reverse" }}>
            <Text style={{ fontSize: 12, color: colors.darkGray }}>
              22 aprel 2021 y
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text
              style={{
                color: colors.davysGrey,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Xizmatlar uchun to'lov
            </Text>
            <Text
              style={{
                color: colors.neonGreen,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              -1 500 so’m
            </Text>
          </View>
          <Text>
            Sizning hisobingiz toldirildi, siz ushbu pullarni faqat bizning
            ilovamizda ishlata olasiz shuning dek ushbu pullar o’z hisobingizda
            saqlanadi.
          </Text>
          <View style={{ marginTop: 4, flexDirection: "row-reverse" }}>
            <Text style={{ fontSize: 12, color: colors.darkGray }}>
              22 aprel 2021 y
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text
              style={{
                color: colors.davysGrey,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Xizmatlar uchun to'lov
            </Text>
            <Text
              style={{
                color: colors.neonGreen,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              -7 000 so’m
            </Text>
          </View>
          <Text>
            Sizning hisobingiz toldirildi, siz ushbu pullarni faqat bizning
            ilovamizda ishlata olasiz shuning dek ushbu pullar o’z hisobingizda
            saqlanadi.
          </Text>
          <View style={{ marginTop: 4, flexDirection: "row-reverse" }}>
            <Text style={{ fontSize: 12, color: colors.darkGray }}>
              22 aprel 2021 y
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text
              style={{
                color: colors.davysGrey,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Hisobni to'ldirish
            </Text>
            <Text
              style={{
                color: colors.neonGreen,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              +20 000 so’m
            </Text>
          </View>
          <Text>
            Sizning hisobingiz toldirildi, siz ushbu pullarni faqat bizning
            ilovamizda ishlata olasiz shuning dek ushbu pullar o’z hisobingizda
            saqlanadi.
          </Text>
          <View style={{ marginTop: 4, flexDirection: "row-reverse" }}>
            <Text style={{ fontSize: 12, color: colors.darkGray }}>
              22 aprel 2021 y
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default History;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  card: {
    paddingTop: 17,
    paddingLeft: 9,
    paddingRight: 12,
    backgroundColor: colors.white,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightgray,
    paddingBottom: 9,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
});
