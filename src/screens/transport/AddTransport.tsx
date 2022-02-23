import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "react-native-image-picker";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../api/requests";
import { images } from "../../assets";
import { LeftArrowIcon } from "../../assets/icons/icons";
import { ImagePickerTransportAvatar } from "../../components/imagePickerTransport/ImagePickerTransportAvatar";
import TransportTypeSelector from "../../components/TransportTypeSelector";
import { colors } from "../../constants/color";
import { locationType, transportCostType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useTransportHook } from "./hooks";

const AddTransport = ({ navigation, e }) => {
  const [carImageId, setCarImageId] = useState(null);
  const [costTypes, setCostTypes] = useState(transportCostType);
  const state = useSelector(selectOrderState);
  const dispatch = useDispatch();
  const { createTransport, loading } = useTransportHook();
  const onSubmitFrom = async () => {
    createTransport({
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      from_full_address: state.fromFullAddress,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      transport_type: state.transportType,
      cost: state.cost,
      cost_type: state.costType,
      note: state.note,
      weight: state.weight,
      images: state.carImageId,
      otherName: state.otherName,
      otherNumber: state.otherNumber,
    });
  };

  const [carImageResponse, setCarImageResponse] = useState<ImagePicker.Asset>(
    {}
  );

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 0,
      mediaType: "photo",
    };
    ImagePicker.launchImageLibrary(options, (e) => {
      setCarImageResponse(e);
    });
  }, []);

  let Images = carImageResponse?.assets;

  let carImageForm = new FormData();
  const uploadImage = async (singlePhoto, setFunction) => {
    carImageForm.append("file", {
      uri: singlePhoto.uri,
      type: singlePhoto.type,
      name: singlePhoto.fileName,
    });

    try {
      let res = await requests.uploads.uploadImage(carImageForm);
      setFunction(res.data.data.id);
    } catch (error) { }
  };

  useEffect(() => {
    if (carImageResponse.assets) {
      uploadImage(carImageResponse.assets[0], setCarImageId);
    }
  }, [carImageResponse.assets]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <LeftArrowIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.addTransportText}>Transport qo’shish</Text>
      </View>
      <ScrollView>
        {/* <TransportTypeSelector
          value={state.transportType}
          setValue={(e) => dispatch(setOrderData({ transportType: e }))}
          title={e.title}
        /> */}
        <View style={{ paddingHorizontal: 16, marginTop: 20, }}>
          <Text style={{ fontSize: 14, color: colors.darkGray }}>
            Texnika to'g'risida ma'lumot *
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.white, }]}
            value={state.note!}
            onChangeText={(e) => dispatch(setOrderData({ note: e }))}
            placeholder="Informatsiya"
            placeholderTextColor={colors.darkGray}
            numberOfLines={2}
          />
        </View>
        <View
          style={{
            paddingBottom: 5,
            paddingHorizontal: 16,
            paddingTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 17,
              color: colors.darkGray,
            }}
          >
            Hozirgi manzilingiz *
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.from,
                route: routes.ADD_TRANSPORT,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text
              style={{
                marginLeft: 10,
                color: colors.darkGray,
                fontSize: 14,
              }}
            >
              {!!state.fromRegionName ? state.fromRegionName : "Viloyat"},
              {!!state.fromDistrictName ? state.fromDistrictName : "tuman"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              color: colors.darkGray,
              fontSize: 16,
              marginBottom: 17,
            }}
          >
            Boradigan manzilingiz(kiritish majburiy emas)
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.to,
                route: routes.ADD_TRANSPORT,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text
              style={{
                marginLeft: 10,
                color: colors.darkGray,
                fontSize: 14,
              }}
            >
              {!!state.toRegionName ? state.toRegionName : "Viloyat"},
              {!!state.toDistrictName ? state.toDistrictName : "tuman"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            position: "relative",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: colors.darkGray }}>
            Narxingiz (qatnash uchun)*
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.white,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.lightgray,
              marginTop: 10,
            }}
          >
            <View style={[styles.inputView]}>
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  separator: ',',
                  delimiter: ' ',
                  unit: '',
                  suffixUnit: ''
                }}
                style={{ fontSize: 16 }}
                value={state.cost?.toString()}
                onChangeText={(e) => dispatch(setOrderData({ cost: e }))}
                placeholder="Narxni kiriting..."
                keyboardType="numeric"

              />
            </View>
            <View
              style={{
                width: 150,
                backgroundColor: colors.white,
              }}
            >
              <RNPickerSelect
                onValueChange={(e) => dispatch(setOrderData({ costType: e }))}
                items={[
                  { label: "Kelishiladi", value: "bargain" },
                  { label: "Kun bay", value: "per_day" },
                  { label: "KM bay", value: "per_km" },
                  { label: "Soat bay", value: "per_hour" },
                ]}
              />
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, }}>
          <View
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <BouncyCheckbox
              color={colors.black}
              uncheckedColor={colors.gray}
              status={
                !!state.otherPerson ? "checked" : "unchecked"
              }
              onPress={() =>
                dispatch(
                  setOrderData({
                    otherPerson: !state.otherPerson,
                  })
                )
              }
            />
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  setOrderData({
                    otherPerson: !state.otherPerson,
                  })
                )
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Boshqa odam uchun
              </Text>
            </TouchableOpacity>
          </View>
          {!!state.otherPerson ? (
            <>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ marginTop: 25, color: colors.darkGray }}>Avtor ismi</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Ismi"}
                  value={state.otherName!}
                  onChangeText={(e) =>
                    dispatch(setOrderData({ otherName: e }))
                  }
                />
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ marginTop: 25, color: colors.darkGray }}>Avtor raqami</Text>
                <TextInputMask
                  type={"custom"}
                  options={{
                    mask: "+999 99 999 99 99",
                  }}
                  style={styles.input}
                  placeholder={"+998"}
                  value={state.otherNumber!}
                  onChangeText={(e) =>
                    dispatch(
                      setOrderData({ otherNumber: e })
                    )
                  }
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : undefined}
        </View>
        <View>
          <Text
            style={{
              margin: 15,
              marginTop: 15,
              color: colors.darkGray,
            }}
          >
            Transportingizni fotosurati*
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              flexWrap: 'nowrap'
            }}
          >
            {!!state.images &&
              Object.values(state.images).map((image) => {
                return (
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: 150,
                      height: 100,
                      margin: 10,
                      flexWrap: "nowrap",
                    }}
                  />
                );
              })}
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onImageLibraryPress}
              >
                <ImagePickerTransportAvatar onPress={onImageLibraryPress} />
              </TouchableOpacity>
              {!!Images &&
                Images.map((image) => {
                  return <ImagePickerTransportAvatar uri={image.uri} />;
                })}
            </ScrollView>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, marginVertical: 40 }}>
          <TouchableOpacity
            style={[
              styles.btnOne,
              {
                flexDirection: "column",
                backgroundColor: colors.brightOrangeTwo,
              },
            ]}
            onPress={onSubmitFrom}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {loading ? <ActivityIndicator /> : "Yuborish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default AddTransport;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addTransportText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  inputView: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  btnOne: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderColor: colors.darkOrange,
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 20,
    color: colors.darkGray,
  },
});
