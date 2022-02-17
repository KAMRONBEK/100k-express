import React from "react";
import { FlatList, Image, RefreshControl, ScrollView, View } from "react-native";
import { images } from "../../../assets";
import Filter from "../../../components/Filter";
import TransportItem from "../../../components/TransportItem";
import { routes } from "../../../navigation/routes";
import { useTransportHook } from "../hooks";

export const CommonTransport = () => {
    const { commonTransport, useCommonTransportRefresh, loading } =
        useTransportHook();

    const onRefresh = React.useCallback(() => {
        useCommonTransportRefresh();
    }, []);
    return (
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
        >
            <Filter route={routes.TRANSPORT} />
            <FlatList
                contentContainerStyle={{
                    flex: 1,
                }}
                keyExtractor={(item) => item.id.toString()}
                data={!!commonTransport ? commonTransport : []}
                renderItem={({ item }) => <TransportItem item={item} />}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={images.tarnsport}
                            style={{
                                height: 140,
                                alignItems: "center",
                                width: 140,
                                marginBottom: 80,
                            }}
                        />
                    </View>
                )}
            />
        </ScrollView>
    );
};
