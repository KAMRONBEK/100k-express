import React, { useState } from "react";
import { FlatList, RefreshControl, ScrollView } from "react-native";
import TransportItem from "../../../components/TransportItem";
import { useTransportHook } from "../hooks";

export const SeenTransport = () => {
    let [activeIndex, setActiveIndex] = useState(0);
    const { seenTransport, useSeenTransportRefresh, loading } = useTransportHook();

    const onRefresh = React.useCallback(() => {
        useSeenTransportRefresh();
    }, []);
    return (
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
        >
            <FlatList
                contentContainerStyle={{
                    flex: 1,
                }}
                keyExtractor={(item) => item.id.toString()}
                data={!!seenTransport ? seenTransport : []}
                renderItem={({ item }) => <TransportItem item={item} />}
            />
        </ScrollView>
    );
};
