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

const QuestionMail = () => {
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
          Express pochta
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
          Express jo'natmalar bo'limida siz uyingizdan turib jo'natmangizni
          boshqa viloyat yoki shaharga berib yuborishigiz mumkin. Bazi hollarda
          qimmatbaho buyumlarni yuborish zaruruyati tug'ulib qoladi va bunday
          holatlarda esa ishonchli tanish haydovchi topa olmasangiz ko'nglingiz
          notinch bo'ladi. Biz shu kabi muammolar yechimi tayyor buyurtma berish
          formasini toldirish vaqtida qimmatbaho buyumingiz qiymatini kirinig
          hotirjam ishlaringizni davom ettiring
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
            Buyurtma berish formasini to'ldirganizda, tizim bir zumda summasini
            hisoblab beradi.
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
            Tahminan 10 daqiqa ishida sizga eng yaqin va yuqori reytingli kuryer
            biriktiladi
          </Text>
        </View>
        <View style={styles.paragraphsView}>
          <Text style={styles.sinceText}>© 2012-2022</Text>
          <Text style={styles.sinceText}>"100k Express"</Text>
          <Text style={styles.sinceText}>ОГРН 1147746136713</Text>
          <Text style={styles.sinceText}>ИНН 77314665565</Text>
          <Text style={styles.sinceText}>КПП 773101001</Text>
          <View style={styles.decorationView}>
            <Text style={styles.directionTexts}>О компании</Text>
            <Text style={styles.directionTexts}>Тарифы</Text>
            <Text style={styles.directionTexts}>Контакты</Text>
            <Text style={styles.directionTexts}>Вакансии</Text>
            <Text style={styles.directionTexts}>Правила</Text>
            <Text style={styles.directionTexts}>Магазинам</Text>
            <Text style={styles.directionTexts}>Юр лицам</Text>
            <Text style={styles.directionTexts}>Курьерам</Text>
            <Text style={styles.directionTexts}>FAQ</Text>
            <Text style={styles.directionTexts}>Грузоперевозки</Text>
            <Text style={styles.directionTexts}>Отзывы Интеграция по API</Text>
            <Text style={styles.directionTexts}>Экспресс-доставка</Text>
            <Text style={styles.directionTexts}>Блог 100К</Text>
            <Text style={styles.directionTexts}>
              Политика конфиденциальности
            </Text>
            <Text style={styles.directionTexts}>Контакты</Text>
          </View>
        </View>
        <View style={styles.netsView}>
          <TouchableOpacity activeOpacity={0.8}>
            <FaceBookIcon size={40} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.instagram}>
            <InstagramIcon size={36} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuestionMail;

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
