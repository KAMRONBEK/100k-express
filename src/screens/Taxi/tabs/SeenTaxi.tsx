import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import PassangerItem from "../../../components/PassangerItem";
import { colors } from "../../../constants/color";
import { useTaxiHook } from "../hooks";

export const SeenTaxi = () => {
  const { seenTaxi, useSeenTaxiRefresh, loading } = useTaxiHook();
  let navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    useSeenTaxiRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        style={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        // ListHeaderComponent={<Filter route={routes.PASSENGER} />}
        data={!!seenTaxi ? seenTaxi : []}
        renderItem={({ item }) => <PassangerItem item={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  scrollView: {
    paddingBottom: 70,
  },
})
