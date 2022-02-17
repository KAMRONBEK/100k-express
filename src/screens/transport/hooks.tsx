import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import {
  selectCommonTransport,
  selectSeenTransport,
  selectTransport,
  setCommonTransport,
  setSeenTransport,
  setTransport,
} from "../../redux/slices/transport/transport";
import { selectUser } from "../../redux/slices/user/user";
import { routes } from "../../navigation/routes";

enum transportOrderType {
  new = "new",
  active = "active",
  newest = "asd"
}

export let useTransportHook = () => {

  let transport = useSelector(selectTransport);
  let commonTransport = useSelector(selectCommonTransport);
  let seenTransport = useSelector(selectSeenTransport)
  let navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  const loadTransport = async () => {
    setLoading(true)
    try {
      let res = await requests.transport.user.getTransport(transportOrderType.newest);
      dispatch(setTransport(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in transport", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }


  const loadCommonTransport = async () => {
    setLoading(true)
    try {
      let res = await requests.transport.common.getCommonTransport();
      dispatch(setCommonTransport(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in common transport", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }

  const loadSeenTransport = async () => {
    setLoading(true)
    try {
      let res = await requests.transport.user.getTransport(transportOrderType.active);
      dispatch(setSeenTransport(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in seen transport", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }

  let effect = () => {
    loadTransport()
    loadCommonTransport()
    loadSeenTransport()
  };

  let useTransportRefresh = () => {
    loadTransport()
  };
  let useCommonTransportRefresh = () => {
    loadCommonTransport()
  };
  let useSeenTransportRefresh = () => {
    loadSeenTransport()
  };


  const onConnect = async (id) => {
    let res = await requests.transport.getTransportBuyContact(id);
  }

  useEffect(() => {
    effect();
  });

  const createTransport = async (credentials) => {
    setLoading(true);
    try {
      let res = await requests.transport.driver.createTransport(credentials);
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

  const editTransport = async (credentials, id) => {
    setLoading(true);
    try {
      let res = await requests.transport.driver.editTransport(credentials, id);
      showMessage({
        message: "Zakaz qabul qilindi",
        type: "success",
        icon: "success",
        floating: true,
      });
      navigation.navigate(routes.TRANSPORT);
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
    transport,
    commonTransport,
    useTransportRefresh, useCommonTransportRefresh, useSeenTransportRefresh,
    createTransport,
    loading,
    editTransport,
    seenTransport,
    onConnect
  };
};
