import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Filter from "../../../components/Filter";
import LoadItem from "../../../components/LoadItem";
import { routes } from "../../../navigation/routes";
import { useLoadHook } from "../hooks";

export const CommonLoad = () => {
  const { commonLoad, useCommonLoadRefresh, loading } = useLoadHook();
  let navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    useCommonLoadRefresh();
  }, []);

  return (
    <View style={{ flex: 1 }}
    >
      <FlatList
        ListHeaderComponent={
          <Filter route={routes.LOAD} />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={!!commonLoad ? commonLoad : []}
        renderItem={({ item }) => <LoadItem item={item} />}
      />
    </View>
  );
};