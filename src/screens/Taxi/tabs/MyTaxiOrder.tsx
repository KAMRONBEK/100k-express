import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PassangerItem from '../../../components/PassangerItem'
import { useTaxiHook } from '../hooks';
import { colors } from '../../../constants/color';
import Filter from '../../../components/Filter';
import { routes } from '../../../navigation/routes';

export const MyTaxiOrder = () => {
  const { taxi, useTaxiRefresh, loading } = useTaxiHook();
  const onRefresh = React.useCallback(() => {
    useTaxiRefresh();
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
        data={!!taxi ? taxi : []}
        renderItem={({ item }) => <PassangerItem item={item} />}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  scrollView: {
    paddingBottom: 70,
  },
})