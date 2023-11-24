import { observe } from "mobx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./auth/Login";
import Home from "./main/Home";
import authStore from "./store/AuthStore";
import { observer } from "mobx-react";
import { Scanner } from "./main/Scaner";

const MainApp = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authStore.logged ? (
          <Stack.Group>
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={Login}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="home"
              options={{ headerShown: false }}
              component={Home}
            />
            <Stack.Screen
              name="scanner"
              options={{ headerShown: false }}
              component={Scanner}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default observer(MainApp);
