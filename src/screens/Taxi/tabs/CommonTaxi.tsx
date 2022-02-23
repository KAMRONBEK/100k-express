import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  RefreshControl, View
} from 'react-native';
import Filter from '../../../components/Filter';
import PassangerItem from '../../../components/PassangerItem';
import { routes } from '../../../navigation/routes';
import { useTaxiHook } from '../hooks';

export const CommonTaxi = () => {
  const { commonTaxi, useCommonTaxiRefresh, loading } = useTaxiHook();
  let navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    useCommonTaxiRefresh();
  }, []);

  return (
    <View style={{ flex: 1 }}  >
      <FlatList
        initialNumToRender={3}
        style={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<Filter route={routes.PASSENGER} />}
        data={!!commonTaxi ? commonTaxi : []}
        renderItem={({ item }) => <PassangerItem item={item} />}
      />
    </View>
  );
};
