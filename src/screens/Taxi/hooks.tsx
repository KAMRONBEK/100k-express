import { useDispatch, useSelector } from "react-redux";
import {
    setTaxi,
    selectTaxi,
    update,
    selectCommonTaxi,
    setCommonTaxi,
    selectSeenTaxi,
    setSeenTaxi,
} from "../../redux/slices/taxi/taxi";
import React, { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { showMessage, hideMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { useNavigation } from "@react-navigation/core";
import { routes } from "../../navigation/routes";
import { selectUser } from "../../redux/slices/user/user";

export let useTaxiHook = () => {
    let taxi = useSelector(selectTaxi);
    let commonTaxi = useSelector(selectCommonTaxi);
    let seenTaxi = useSelector(selectSeenTaxi)
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let user = useSelector(selectUser);

    const loadTaxi = async () => {
        try {
            let res = await requests.taxi.user.getTaxi();
            dispatch(setTaxi(res.data.data));
        }
        catch (err: any) {
            showMessage({ message: JSON.stringify(err.response.data) + "\n error in taxi", type: 'danger' })
        }
        finally {
            setLoading(false)
        }
    }

    const loadCommonTaxi = async () => {
        try {
            let res = await requests.taxi.common.getCommonTaxi();
            dispatch(setCommonTaxi(res.data.data));
        }
        catch (err: any) {
            showMessage({ message: JSON.stringify(err.response.data) + "\n error in common taxi", type: 'danger' })
        }
        finally {
            setLoading(false)
        }
    }

    const loadSeenTaxi = async () => {
        try {
            let res = await requests.taxi.driver.getSeenTaxi();
            dispatch(setSeenTaxi(res.data.data));
        }
        catch (err: any) {
            showMessage({ message: JSON.stringify(err.response.data) + "\n error in seen taxi", type: 'danger' })
        }
        finally {
            setLoading(false)
        }
    }

    let effect = () => {
        setLoading(true)
        loadTaxi()
        loadCommonTaxi()
        loadSeenTaxi()
    };

    let useTaxiRefresh = () => {
        loadTaxi()
    };
    let useCommonTaxiRefresh = () => {
        loadCommonTaxi()
    };
    let useSeenTaxiRefresh = () => {
        loadSeenTaxi()
    };

    const onConnect = async (id) => {
        let res = await requests.taxi.driver.buyContact(id);
    }

    useEffect(() => {
        effect();
    }, []);

    const createPassanger = async (credentials) => {
        setLoading(true);
        try {
            let res = await requests.taxi.user.createPassanger(credentials);
            showMessage({
                message: "Zakaz qabul qilindi",
                type: "success",
                icon: "success",
                floating: true,
            });
            navigation.goBack();
        } catch (error) {
            reactotron.log!(error);
            showMessage({
                message: error.message,
                type: "danger",
                icon: "danger",
                floating: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const editPassanger = async (credentials, id) => {
        setLoading(true);
        try {
            let res = await requests.taxi.user.editPassanger(credentials, id);
            showMessage({
                message: "Zakaz qabul qilindi",
                type: "success",
                icon: "success",
                floating: true,
            });
            navigation.navigate(routes.PASSENGER);
        } catch (error) {
            reactotron.log!(error);
            showMessage({
                message: error.message,
                type: "danger",
                icon: "danger",
                floating: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        taxi,
        commonTaxi,
        createPassanger,
        loading,
        editPassanger,
        onConnect,
        useSeenTaxiRefresh,
        useCommonTaxiRefresh,
        useTaxiRefresh,
        seenTaxi
    };
};
