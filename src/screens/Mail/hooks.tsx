import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import reactotron from "reactotron-react-native";
import { throttle } from "underscore";
import { requests } from "../../api/requests";
import { routes } from "../../navigation/routes";
import {
  IMail,
  selectCommonMail,
  selectMail,
  selectPackageListMail,
  selectReceiveMail,
  setCommonMail,
  setMail,
  setPackageListMail,
  setReceiveMail
} from "../../redux/slices/mail/mail";
import { selectUser } from "../../redux/slices/user/user";

export let useMailHook = () => {
  let mail = useSelector(selectMail);
  let commonMail = useSelector(selectCommonMail);
  let receiveMail = useSelector(selectReceiveMail);
  let packageListMail = useSelector(selectPackageListMail);
  let navigation = useNavigation();
  let [filteredMail, setFilteredMail] = useState<IMail[]>();
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let user = useSelector(selectUser);

  const loadMail = throttle(async () => {
    setLoading(true)
    try {
      let res = await requests.mail.user.getMail();
      dispatch(setMail(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in mail", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }, 1000)

  const loadCommonMail = throttle(async () => {
    setLoading(true)
    try {
      let res = await requests.mail.common.getCommonMail();
      dispatch(setCommonMail(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in mail common", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }, 1000)

  const loadReceiveMail = throttle(async () => {
    setLoading(true)
    try {
      let res = await requests.mail.recipient.getReceiveMail()
      dispatch(setReceiveMail(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in mail receive", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }, 1000)

  const loadPackageListMail = throttle(async () => {
    setLoading(true)
    try {
      let res = await requests.mail.user.getPackageListMail()
      dispatch(setPackageListMail(res.data.data));
    }
    catch (err: any) {
      showMessage({ message: JSON.stringify(err.response.data) + "\n error in mail packageList", type: 'danger' })
    }
    finally {
      setLoading(false)
    }
  }, 1000)

  let effect = () => {
    loadMail()
    loadCommonMail()
    loadReceiveMail()
    loadPackageListMail()
  };
  let useMailRefresh = () => {
    loadMail()
  };
  let useCommonMailRefresh = () => {
    loadCommonMail()
  };
  let useReceiveMailRefresh = () => {
    loadReceiveMail()
  }
  let usePackageListMailRefresh = () => [
    loadPackageListMail()
  ]

  useEffect(() => {
    effect();
  }, []);

  const onConnect = async (id) => {
    let res = await requests.mail.driver.buyContact(id);
  }

  const filterMail = (status) => {
    setFilteredMail(
      mail.filter((item) => {
        if (item.status_label.toLowerCase() == status.toLowerCase()) {
          return item;
        }
      })
    );
  };

  const createMail = async (credentials) => {
    setLoading(true);
    try {
      let res = await requests.mail.user.createMail(credentials);
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

  const editMail = async (credentials, id) => {
    setLoading(true);
    try {
      let res = await requests.mail.user.editMail(credentials, id);
      showMessage({
        message: "Zakaz qabul qilindi",
        type: "success",
        icon: "success",
        floating: true,
      });
      navigation.navigate(routes.MAIL);
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

  const onScanPress = () => {
    navigation.navigate(routes.CAMERA)
  }

  return {
    mail,
    filteredMail,
    filterMail,
    commonMail,
    receiveMail,
    packageListMail,
    createMail,
    loading,
    editMail,
    onScanPress,
    useMailRefresh,
    useCommonMailRefresh,
    useReceiveMailRefresh,
    usePackageListMailRefresh,
    onConnect
  };
};
