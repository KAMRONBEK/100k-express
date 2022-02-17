import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import reactotron from "reactotron-react-native";
import { requests } from "../../api/requests";
import { routes } from "../../navigation/routes";
import {
    selectBuyContact,
    selectCommonLoad,
    selectLoad,
    setBuyContact,
    setCommonLoad,
    setLoad,
} from "../../redux/slices/load/load";
import { selectUser } from "../../redux/slices/user/user";

export let useLoadHook = () => {
    let load = useSelector(selectLoad);
    let commonLoad = useSelector(selectCommonLoad);
    let buyContact = useSelector(selectBuyContact)
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let user = useSelector(selectUser);
    let dispatch = useDispatch();
    let effect = async () => {
        try {
            let res = await requests.load.getLoad();
            dispatch(setLoad(res.data.data));

            let resCommon = await requests.load.getCommonLoad();
            dispatch(setCommonLoad(resCommon.data.data));

            let resBuyContact = await requests.load.getLoadBuyContact();
            dispatch(setBuyContact(resBuyContact.data.data))
        } catch (err) {
            console.log(err.response);
            showMessage({
                message: JSON.stringify(err.response),
                type: "danger",
                icon: "danger",
                floating: true,
            })
        }
    };
    useEffect(() => {
        effect();
    });

    const refreshLoad = () => {
        effect();
    };

    const createLoad = async (credentials) => {
        setLoading(true);
        try {
            let res = await requests.load.createLoad(credentials);
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

    const editLoad = async (credentials, id) => {
        setLoading(true);
        try {
            let res = await requests.load.createLoad(credentials, id);
            showMessage({
                message: "Zakaz qabul qilindi",
                type: "success",
                icon: "success",
                floating: true,
            });
            navigation.navigate(routes.LOAD);
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
        load,
        commonLoad,
        refreshLoad,
        createLoad,
        loading,
        editLoad,
        buyContact,
    };
};
