import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../constants/color";
import {
  BellIcon,
  FaceBookIcon,
  InstagramIcon,
  UpdateIcon,
  UserIcon,
} from "../assets/icons/icons";
import { images } from "../assets";
import { ScrollView } from "react-native-gesture-handler";

const QuestionLoad = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.logoView}>
            <Image style={styles.beeImage} source={images.bee} />
            <Text style={styles.logoText}>100K</Text>
          </View>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.languageText}>O'zbek</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            fontWeight: "bold",
            fontSize: 24,
            color: colors.darkBlue,
          }}
        >
          Yuk tashish
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 25,
            paddingBottom: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            color: colors.darkBlue,
          }}
        >
          100k Kargo bo'limi yuk mashinalarni tez va arzon narxlarda topishda
          yordam beradi. Ilovani yuklab olib manzil va yukingiz haqida ma'lumot
          kiriting va shu zahotiyoq siz bilan yuk mashina haydovchilari
          bog'lanishadi
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginBottom: 30,
          }}
        >
          <ImageBackground
            source={images.angle}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
              marginHorizontal: 10,
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UpdateIcon />
          </ImageBackground>
          <Text
            style={{
              width: 245,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            Endi yuk mashinalar avtoturargohida borib yuk mashinalarni izlash
            shart emas. 100k Kargo vaqtingizni tejaydi.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginBottom: 30,
          }}
        >
          <ImageBackground
            source={images.angle}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
              marginHorizontal: 10,
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserIcon />
          </ImageBackground>
          <Text
            style={{
              width: 245,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            Narxni siz taklif qilasiz tizim esa sizning eloningizni eng yaqin
            haydovchilarga ko'rsatib ularni siz bilan bog'lab beradi
          </Text>
        </View>
        <View style={styles.paragraphsView}>
          <Text style={styles.sinceText}>?? 2012-2022</Text>
          <Text style={styles.sinceText}>"100k Express"</Text>
          <Text style={styles.sinceText}>???????? 1147746136713</Text>
          <Text style={styles.sinceText}>?????? 77314665565</Text>
          <Text style={styles.sinceText}>?????? 773101001</Text>
          <View style={styles.decorationView}>
            <Text style={styles.directionTexts}>?? ????????????????</Text>
            <Text style={styles.directionTexts}>????????????</Text>
            <Text style={styles.directionTexts}>????????????????</Text>
            <Text style={styles.directionTexts}>????????????????</Text>
            <Text style={styles.directionTexts}>??????????????</Text>
            <Text style={styles.directionTexts}>??????????????????</Text>
            <Text style={styles.directionTexts}>???? ??????????</Text>
            <Text style={styles.directionTexts}>????????????????</Text>
            <Text style={styles.directionTexts}>FAQ</Text>
            <Text style={styles.directionTexts}>????????????????????????????</Text>
            <Text style={styles.directionTexts}>???????????? ???????????????????? ???? API</Text>
            <Text style={styles.directionTexts}>????????????????-????????????????</Text>
            <Text style={styles.directionTexts}>???????? 100??</Text>
            <Text style={styles.directionTexts}>
              ???????????????? ????????????????????????????????????
            </Text>
            <Text style={styles.directionTexts}>????????????????</Text>
          </View>
        </View>
        <View style={styles.netsView}>
          <TouchableOpacity activeOpacity={0.8}>
            <FaceBookIcon size={40} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.instagram}>
            <InstagramIcon size={38} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuestionLoad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  headerView: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    flexDirection: "row",
  },
  logoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  beeImage: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkBlue,
    marginLeft: 5,
  },
  languageText: {
    color: colors.darkBlue,
    fontSize: 18,
  },
  paragraphsView: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30,
    marginVertical: 15,
  },
  sinceText: {
    color: colors.darkGray,
    marginTop: 5,
    fontSize: 12,
  },
  directionTexts: {
    textDecorationLine: "underline",
    color: colors.darkGray,
    marginTop: 5,
    fontSize: 12,
  },
  decorationView: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  netsView: {
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  instagramStyle: {
    width: 40,
    height: 40,
  },
  instagram: {
    marginLeft: 10,
  },
});
