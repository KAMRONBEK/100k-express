import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets";
import {
  CheckedIcon,
  LeftArrowIcon,
  PensolIcon,
  PlusIcon,
  XIcon,
} from "../assets/icons/icons";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { selectUser } from "../redux/slices/user/user";
import LottieView from 'lottie-react-native';
import { lotties } from "../lotties";
import { TextInputMask } from "react-native-masked-text";
import { useMailHook } from "../screens/Mail/hooks";


interface IMailProp {
  item: any;
  editable?: boolean;
}

const MailItem = ({ item, editable }: IMailProp) => {
  let navigation = useNavigation();
  let user = useSelector(selectUser);
  let dispatch = useDispatch();
  let { onConnect } = useMailHook()

  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const toggleModal = () => {
    setDeleteModalVisibility(!deleteModalVisibility);
  };

  const [checkedModalVisibility, setCheckedModalVisibility] = useState(false);

  const toggleModalTwo = () => {
    setCheckedModalVisibility(!checkedModalVisibility);
  };

  //client accept modal
  const isCourier = useSelector(selectUser).is_deliveryman
  const [acceptIsCourier, setAcceptIsCourier] = useState(false);
  const [isModalVisibleAccept, setModalVisibleAccept] = useState(false);
  const toggleAcceptanceModal = () => {
    if (isCourier) {
      setAcceptIsCourier(!acceptIsCourier)
    } else {
      setModalVisibleAccept(!toggleConnectionModal);
    }
  };

  // IsCourier

  const [connectionModal, setConnectionModal] = useState(false);
  const toggleConnectionModal = () => {
    onConnect(item.id);
    setConnectionModal(!connectionModal);
  }


  return (
    <View style={styles.container}>
      <View style={styles.boxOrders}>
        <View style={styles.moneyView}>
          <TextInputMask type={"money"}
            options={{
              precision: 0,
              separator: ',',
              delimiter: ' ',
              unit: '',
              suffixUnit: ''
            }}
            value={item.cash_amount.toString()} style={styles.moneyText} editable={false} />
          <Text style={styles.cashText}>so'm</Text>
        </View>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{item.status_label}</Text>
        </View>
      </View>
      <View style={styles.addressView}>
        <View style={styles.imageView}>
          <Text style={styles.addressText}>- {item.from_full_address}</Text>
        </View>
        <View>
          <Text style={styles.idView}>#{item.id}</Text>
        </View>
      </View>
      <View style={styles.toAddressView}>
        <Text style={styles.toAddressText}>- {item.to_full_address}</Text>
      </View>
      <View style={styles.thingOrder}>
        <Image source={images.boxOne} style={styles.boxOneImage} />
        <Text style={styles.matterText}>{item.matter}</Text>
      </View>
      <View style={styles.securityView}>
        <Image source={images.security} style={styles.boxOneImage} />
        <Text style={styles.matterText}>{item.insurance_amount}</Text>
      </View>
      <View style={styles.avatarView}>
        <View style={styles.borderBottom}>
          <View style={styles.avatarwrapper}>
            <Image
              source={{ uri: item.creator_avatar }}
              style={styles.avatarImgBox}
            />
            <View>
              <Text style={styles.nameText}>
                {!!item.creator_name ? item.creator_name : "Anonim"}
                {user.id == item.creator_id && " (siz)"}
              </Text>
              <Text style={styles.creatorAtText}>{item.created_at}</Text>
            </View>
          </View>
          {editable ? (
            <View
              style={{
                marginHorizontal: 10,
                marginLeft: 30,
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <View>
                <Modal
                  isVisible={deleteModalVisibility}
                  testID={"modal"}
                  onBackdropPress={() => setDeleteModalVisibility(false)}
                  style={{
                    justifyContent: "flex-end",
                    margin: 0,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.white,
                      paddingBottom: 10
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 15,
                        backgroundColor: colors.white,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderRadius: 30,
                        }}
                        onPress={toggleModal}
                      >
                        <LeftArrowIcon size={25} />
                      </TouchableOpacity>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 90,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            justifyContent: "center",
                            textAlign: "center",
                            paddingVertical: 15,
                            marginLeft: -25
                          }}
                        >
                          Buyurtmani bekor qilish
                        </Text>
                      </View>
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 18 }}>
                      <Text style={{ fontSize: 14 }}>Buyurtmani bekor qilishga nima sabab bo'ldi?</Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 20,
                        marginBottom: 50,
                      }}
                    >
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: colors.darkGray,
                          paddingHorizontal: 15,
                          paddingBottom: 70,
                          paddingVertical: 12
                        }}
                        placeholder="Izoh qoldiring"
                        placeholderTextColor={colors.darkGray}
                        keyboardType="default"

                      />
                    </View>
                    <TouchableWithoutFeedback onPress={toggleModal}>
                      <View
                        style={{
                          backgroundColor: colors.lightOrange,
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 15,
                          paddingVertical: 14,
                          borderRadius: 10,
                          marginVertical: 30,
                          shadowColor: colors.black,
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            textAlign: "center",
                            textTransform: 'uppercase'
                          }}
                        >
                          Bekor qilish
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </Modal>
                <TouchableOpacity
                  style={styles.iconsbutton}
                  onPress={toggleModal}
                >
                  <XIcon size={17} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.pensolbutton}
                onPress={() =>
                  navigation.navigate(routes.EDIT_MAIL, {
                    id: item.id,
                  })
                }
              >
                <PensolIcon size={15} />
              </TouchableOpacity>
              <View>
                <Modal
                  isVisible={checkedModalVisibility}
                  testID={"modal"}
                  onBackdropPress={() => setCheckedModalVisibility(false)}
                  style={{
                    justifyContent: "flex-end",
                    margin: 0,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.white,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        marginHorizontal: 10,
                        borderBottomWidth: 1,
                        borderColor: colors.gray,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderRadius: 30,
                        }}
                      >
                        <LeftArrowIcon size={30} />
                      </TouchableOpacity>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 90,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            paddingVertical: 10,
                          }}
                        >
                          E'loni yakunlash
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 20,
                        marginBottom: 50,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        Agar siz o'zingizga kerakli haydovchini topgan
                        bo'lsangiz quydagi yakunlash tugmasini bosing.
                        Yakunlagan e'lon qaytib haydovchilarga ko'rsatilmaydi
                      </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={toggleModalTwo}>
                      <View
                        style={{
                          backgroundColor: colors.lightOrange,
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 15,
                          paddingVertical: 12,
                          borderRadius: 10,
                          marginVertical: 30,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            textAlign: "center",
                          }}
                        >
                          YAKUNLASH
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </Modal>
                <TouchableOpacity
                  style={styles.checkedbutton}
                  onPress={toggleModalTwo}
                >
                  <CheckedIcon size={17} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            user.id !== item.creator_id && (
              <>
                <Modal
                  isVisible={isModalVisibleAccept}
                  testID={"modal"}
                  swipeDirection={["right", "down", "left"]}
                  swipeThreshold={Dimensions.get("window").width / 2}
                  onSwipeComplete={() => {
                    setModalVisibleAccept(false);
                  }}
                  style={{
                    justifyContent: "center",
                    margin: 0,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: colors.white,
                      paddingHorizontal: 25,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.expressImageView}>
                      <Image source={images.bee} style={styles.beeImage} />
                      <Text style={styles.expressText}>100k Express</Text>
                      <Text style={styles.paragraph}>
                        Haydovchi sifatida siz ham yuk, ham yo'lovchi tashish
                        transport vositalarni qo'shishingiz mumkin. Ushbu
                        xizmatdan foydalanish uchun Kuryer bo'lib ro'yxatdan
                        o'ting
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.getCourier}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate(routes.COURIER);
                        setModalVisibleAccept(false);
                      }}
                    >
                      <Text style={styles.getCourierText}>Kuryer bo'lish</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={acceptIsCourier}
                  testID={"modal"}
                  swipeThreshold={Dimensions.get("window").width / 2}
                  onSwipeComplete={() => {
                    setAcceptIsCourier(false);
                  }}
                  style={{
                    justifyContent: "center",
                    margin: 0,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.white,
                      marginHorizontal: 40,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <LottieView source={lotties.xLottie} autoPlay style={{ width: 120, height: 120, }} />
                    <Text style={styles.offMailText}>Ilovadan pochta olish vaqtincha ochirilgan</Text>
                    <TouchableWithoutFeedback onPress={toggleAcceptanceModal}>
                      <Text style={styles.okText}>OK</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </Modal>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={toggleAcceptanceModal}
                >
                  <View style={styles.plusView}>
                    <PlusIcon size={16} />
                  </View>
                  <Text style={styles.receiveText}>QABUL QILISH</Text>
                </TouchableOpacity>
              </>
            )
          )}
        </View>
      </View>
    </View >
  );
}


export default MailItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  boxOrders: {
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  btn1: {
    borderColor: colors.darkOrange,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: colors.lightOrange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusView: {
    borderRadius: 20,
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  pensolbutton: {
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderColor: colors.darkGray,
  },
  checkedbutton: {
    borderWidth: 1.5,
    borderColor: colors.darkGray,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  iconsbutton: {
    borderWidth: 1.5,
    borderColor: colors.darkGray,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  borderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    // paddingTop: 10,
  },
  avatarwrapper: {
    flexDirection: "row",
    // borderWidth: 1,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  modalView: {
    margin: 20,
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginRight: 30,
    marginLeft: 50,
  },

  buttonClose: {
    marginLeft: 10,
  },
  textStyle: {
    color: colors.gray,
    fontWeight: "600",
    textAlign: "center",
  },
  textStyles: {
    color: colors.orange,
    fontWeight: "600",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: colors.black,
    paddingHorizontal: 5,
  },
  moneyView: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  moneyText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cashText: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  statusView: {
    backgroundColor: "#dbfaec",
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 8,
    opacity: 1,
  },
  statusText: {
    color: colors.darkGreen,
  },
  addressView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  ellipseBox: {
    width: 10,
    height: 10,
    marginRight: 12,
  },
  addressText: {
    fontSize: 15,
    fontWeight: "normal",
  },
  idView: {
    color: colors.darkGray,
    fontSize: 12,
  },
  toAddressView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -5.3,
  },
  toAddressText: {
    fontSize: 15,
    fontWeight: "normal",
    color: colors.black,
  },
  clockView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 21,
  },
  validityText: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 15,
  },
  avatarView: {
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarImgBox: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  nameText: {
    marginLeft: 10,
    color: "gray",
    fontWeight: "500",
  },
  creatorAtText: {
    marginLeft: 10,
    color: "gray",
    fontWeight: "600",
  },
  receiveText: {
    marginLeft: 4,
    fontSize: 11,
  },
  thingOrder: {
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  boxOneImage: {
    width: 20,
    height: 20,
    tintColor: colors.lightOrange,
  },
  matterText: {
    marginLeft: 5,
  },
  securityView: {
    flexDirection: "row",
    paddingHorizontal: 11,
    alignItems: "center",
    marginVertical: 10,
  },
  beeImage: {
    marginVertical: 15,
    marginTop: 20,
    width: 90,
    height: 90,
  },
  expressText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 30,
  },
  paragraph: {
    width: 280,
    textAlign: "center",
    fontSize: 20,
    color: colors.darkGray,
  },
  getCourier: {
    backgroundColor: colors.lightOrange,
    paddingHorizontal: 98,
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 40,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expressImageView: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 70,
  },
  getCourierText: {
    color: colors.black,
    fontSize: 16,
  },
  okText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.greenLigth,
    marginTop: 20,
    marginBottom: 20
  },
  offMailText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
