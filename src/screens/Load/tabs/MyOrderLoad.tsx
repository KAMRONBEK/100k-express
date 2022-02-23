import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import LoadItem from "../../../components/LoadItem";
import { colors } from "../../../constants/color";
import { useLoadHook } from "../hooks";

export const MyOrderLoad = () => {
  const { load, useLoadRefresh, loading } = useLoadHook();
  let navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    useLoadRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {!!load &&
          load.map((item) => (
            <LoadItem item={item} key={`${item.id}`} editable={true} />
          ))}
      </ScrollView>
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
