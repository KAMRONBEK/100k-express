// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
// import { createStackNavigator } from '@react-navigation/stack';
// import { PermissionsPage } from './PermissionPage';
// import { CameraPage } from './CameraPage';

// type Routes = {
//     PermissionsPage: undefined;
//     CameraPage: undefined;
//     MediaPage: {
//         path: string;
//         type: 'video' | 'photo';
//     };
// };

// const Stack = createStackNavigator<Routes>();

// const CameraModule = () => {



//     const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

//     useEffect(() => {
//         Camera.getCameraPermissionStatus().then(setCameraPermission);
//     }, []);


//     if (cameraPermission == null) {
//         // still loading
//         return null;
//     }


//     const showPermissionsPage = cameraPermission !== 'authorized'
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false,
//                 animationTypeForReplace: 'push',
//             }}
//             initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}>
//             <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
//             <Stack.Screen name="CameraPage" component={CameraPage} />
//             {/* <Stack.Screen */}
//             {/* name="MediaPage" */}
//             {/* // component={MediaPage} */}
//             {/* options={{ */}
//             {/* animation: 'none', */}
//             {/* presentation: /'transparentModal', */}
//             {/* }} */}
//             {/* /> */}
//         </Stack.Navigator>
//     );
// };

// export default CameraModule;

// const styles = StyleSheet.create({});
