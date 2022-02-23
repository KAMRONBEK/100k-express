import React from 'react';
import {FlatList, Image, RefreshControl, ScrollView, View} from 'react-native';
import {images} from '../../../assets';
import TransportItem from '../../../components/TransportItem';
import {useTransportHook} from '../hooks';

export const MyTransport = () => {
  const {transport, useTransportRefresh, loading} = useTransportHook();
  const onRefresh = React.useCallback(() => {
    useTransportRefresh();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        keyExtractor={item => item.id.toString()}
        data={!!transport ? transport : []}
        renderItem={({item}) => <TransportItem item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.tarnsport}
              style={{
                height: 140,
                alignItems: 'center',
                width: 140,
                marginBottom: 80,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
