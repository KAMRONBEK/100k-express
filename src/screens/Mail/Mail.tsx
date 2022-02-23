import { useNavigation } from "@react-navigation/core";
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterIcon,
  GlobeIcon,
  PlusIcon,
  QuestionsIcon
} from "../../assets/icons/icons";
import Filter from "../../components/Filter";
import FilterModal from "../../components/FilterModal";
import MailItem from "../../components/MailItem";
import { colors } from "../../constants/color";
import { lotties } from '../../lotties';
import { routes as Routes } from "../../navigation/routes";
import { selectOrderState } from "../../redux/slices/order/order";
import { selectUser } from "../../redux/slices/user/user";
import { useMailHook } from "./hooks";

// FirstRoute

const FirstRoute = () => {
  const { commonMail, useCommonMailRefresh, loading } = useMailHook();
  const onRefresh = React.useCallback(() => {
    useCommonMailRefresh();
  }, []);

  const [showFilter, setShowFilter] = useState(false);
  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const [hideFilter, setHideFilter] = useState(false);
  const toggleHideFilter = () => {
    setHideFilter(!hideFilter);
  };

  return (
    <View
      style={{ marginBottom: 80 }}
    >
      <FlatList
        contentContainerStyle={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<Filter route={Routes.MAIL} />}
        data={!!commonMail ? commonMail : []}
        renderItem={({ item }) => <MailItem item={item} />}
      />
    </View>
  );
};

const SecondRoute = () => {
  const isCourier = useSelector(selectUser).is_deliveryman
  const [mailStatus, setMailStatus] = useState(!isCourier ? [
    { id: 0, title: 'Yangi', value: 'new' },
    { id: 1, title: 'Kurier topildi', value: 'accepted' },
    { id: 2, title: "Yo'lda", value: 'active' },
    { id: 4, title: 'Bekor qilingan', value: 'canceled' },
    { id: 3, title: 'Bajarilgan', value: 'completed' },
  ] : [
    { id: 0, title: 'Yangi', value: 'new' },
    { id: 1, title: "Yo'lda", value: 'active' },
    { id: 2, title: "Yetkazilgan", value: 'active' },
    { id: 4, title: 'Bekor qilingan', value: 'canceled' },
  ]);
  let [activeIndex, setActiveIndex] = useState(0);
  const { filteredMail, useMailRefresh, filterMail, loading } = useMailHook();
  let navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    useMailRefresh();
  }, []);

  const onPressFilter = (id) => {
    setActiveIndex(id);
    filterMail(mailStatus[id].title);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 10,
          paddingVertical: 2,
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {mailStatus.map((e, i) => {
            return (
              <TouchableOpacity onPress={() => onPressFilter(i)}>
                <Text
                  style={{
                    backgroundColor:
                      activeIndex === i ? colors.cornsilk : colors.lightWhite,
                    color:
                      activeIndex === i ? colors.orange : colors.linghtGray,
                    borderWidth: 0.6,
                    borderRadius: 5,
                    borderColor:
                      activeIndex === i ? colors.orange : colors.linghtGray,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontWeight: "600",
                    marginLeft: 10,
                  }}
                >
                  {e.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          {!!filteredMail &&
            filteredMail.map((item) => (
              <MailItem item={item} key={`${item.id} `} editable={true} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

// ThirdRoute

const ThirdRoute = () => {
  const { packageListMail, usePackageListMailRefresh, loading } = useMailHook();

  const onRefresh = React.useCallback(() => {
    usePackageListMailRefresh();
  }, []);

  return (
    <View
      style={{ marginBottom: 80 }}
    >
      <FlatList
        contentContainerStyle={{
          flex: 1
        }}
        data={!!packageListMail ? packageListMail : []}
        renderItem={({ item }) => <MailItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

// FourthRoute

const FourthRoute = () => {
  let navigation = useNavigation();
  const { receiveMail, useReceiveMailRefresh, loading } = useMailHook();

  const onRefresh = React.useCallback(() => {
    useReceiveMailRefresh();
  }, []);

  return (
    <View
      style={{ marginBottom: 80 }}
    >
      <FlatList
        contentContainerStyle={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={!!receiveMail ? receiveMail : []}
        renderItem={({ item }) => <MailItem item={item} />}
      />
    </View>
  );
};

// Mail

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export interface MailViewProps { }

let titleIconMapper = {
  first: <GlobeIcon />,
};

const Mail = ({ }: MailViewProps) => {
  const layout = useWindowDimensions();
  let navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const isCourier = useSelector(selectUser).is_deliveryman
  const [routes, setRoutes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: !isCourier ? "Mening jo'natmalarim" : "Mening pochtalarim" },
    { key: "third", title: "Ro'yxat" },
    { key: "fourth", title: "Kirim" },
  ]);

  useEffect(() => {
    setRoutes([
      { key: "first", title: "Barchasi" },
      { key: "second", title: !isCourier ? "Mening jo'natmalarim" : "Mening pochtalarim" },
      { key: "third", title: "Ro'yxat" },
      { key: "fourth", title: "Kirim" },
    ])

  }, [isCourier])




  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const state = useSelector(selectOrderState);


  const dispatch = useDispatch();

  const { createMail, loading, onScanPress } = useMailHook();

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const filterToggleModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const onSubmitFrom = () => {
    createMail({
      from_address: state.fromAddress,
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      to_address: state.toAddress,
      note: state.note,
      cash_amount: state.cashAmount,
      delivery_fee_amount: state.deliveryFeeAmount,
      creator_phone: state.creatorPhone,
      recipient_name: state.recipientName,
      recipient_phone: state.recipientPhone,
      creator_name: state.creatorName,
      insurance_amount: state.insurance,
      matter: state.matter,
      vehicle_type: "on_car",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <StatusBar backgroundColor={colors.lightOrange} />
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.QUESTIONMAIL)}
        >
          <QuestionsIcon size={22} />
        </TouchableOpacity>
        <View>
          <Text style={styles.mailText}>Express pochta</Text>
        </View>
        <View>
          <TouchableOpacity onPress={filterToggleModal}>
            <FilterIcon size={22} />
          </TouchableOpacity>
          <FilterModal
            value={filterModalVisible}
            setValue={setFilterModalVisible}
            toggleValue={filterToggleModal}
          />
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            scrollEnabled={true}
            indicatorStyle={{
              backgroundColor: colors.navyBlue,
              left: 11,
              borderWidth: 0.5,
              borderColor: colors.navyBlue,
              marginLeft: -6,
            }}
            tabStyle={{
              width: "auto",
              paddingBottom: 2,
              marginRight: 10,
            }}
            activeColor={colors.navyBlue}
            inactiveColor={colors.darkGray}
            renderLabel={(e) => {
              return (
                <View style={styles.tabView}>
                  {titleIconMapper[e.route.key] && (
                    <GlobeIcon
                      color={e.focused ? colors.navyBlue : colors.darkGray}
                      size={22}
                    />
                  )}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: "bold",
                      fontSize: 13,
                      color: e.focused ? colors.navyBlue : colors.darkGray,
                    }}
                  >
                    {e.route.title}
                  </Text>
                </View>
              );
            }}
            style={{
              backgroundColor: colors.lightWhite,
              paddingLeft: 10,
            }}
            {...props}
          />
        )}
      />
      {!isCourier ? (<TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_MAIL)}
        style={styles.touchOpacity}
      >
        <PlusIcon size={35} />
      </TouchableOpacity>) : (
        <View>
          <TouchableOpacity
            onPress={onScanPress}
            style={styles.touchOpacity}
            activeOpacity={0.6}
          >
            <LottieView source={lotties.scan} autoPlay style={{ height: 45, width: 45 }} />
          </TouchableOpacity>
        </View>
      )
      }
    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 120,
  },
  btntext: {
    color: colors.darkGray,
    fontSize: 13,
  },
  btn: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 8,
  },
  tabView: {
    flexDirection: "row",
    color: colors.darkGray,
    alignItems: "center",
  },
  tabimg: {
    width: 20,
    height: 20,
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 21,
    paddingVertical: 16,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchOpacity: {
    borderColor: colors.darkOrange,
    position: "absolute",
    right: 26,
    bottom: 97,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 65,
    backgroundColor: colors.lightOrange,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mailText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
});
export default Mail;
