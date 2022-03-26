import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import reactotron from "reactotron-react-native";
import { requests } from "../../api/requests";
import { routes } from "../../navigation/routes";
import {
  selectCommonLoad,
  selectLoad,
  selectSeenLoad, setCommonLoad, setLoad, setSeenLoad
} from "../../redux/slices/load/load";
import { selectUser } from "../../redux/slices/user/user";

enum loadOrderType {
  new = "new",
  active = "active",
  newest = "asd"
}

export let useLoadHook = () => {
  let load = useSelector(selectLoad);
  let commonLoad = useSelector(selectCommonLoad);
  let seenLoad = useSelector(selectSeenLoad)
  let navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  const loadLoad = async () => {
    setLoading(true)
    try {
      let res = await requests.load.user.getLoad(loadOrderType.newest);
      dispatch(setLoad(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in load", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }

  const loadCommonLoad = async () => {
    setLoading(true)
    try {
      let res = await requests.load.common.getCommonLoad();
      dispatch(setCommonLoad(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in common load", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }

  const loadSeenLoad = async () => {
    setLoading(true)
    try {
      let res = await requests.load.driver.getLoad(loadOrderType.active);
      dispatch(setSeenLoad(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in seen load", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }

  let effect = () => {
    loadLoad()
    loadCommonLoad()
    loadSeenLoad()
  };

  let useLoadRefresh = () => {
    loadLoad()
  };
  let useCommonLoadRefresh = () => {
    loadCommonLoad()
  };
  let useSeenLoadRefresh = () => {
    loadSeenLoad()
  };


  const onConnect = async (id) => {
    let res = await requests.load.getSeenLoad(id);
  }

  useEffect(() => {
    effect();
  }, []);

  const createLoad = async (credentials) => {
    setLoading(true);
    try {
      let res = await requests.load.user.createLoad(credentials);
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
      let res = await requests.load.user.editLoad(credentials, id);
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
    createLoad,
    loading,
    editLoad,
    seenLoad,
    useLoadRefresh,
    useCommonLoadRefresh,
    useSeenLoadRefresh,
    onConnect
  };
};
