import { observer } from "mobx-react";
import VStack from "../cpn/layout/VStack";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import authStore from "../store/AuthStore";
import { ActivityIndicator, Alert } from "react-native";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLogin = async () => {
    if (loginData.email.trim() === "" || loginData.password.trim() == "") {
      Alert.alert("Form Invalid", "Please fill data to form");
      return;
    }
    await authStore.login(loginData);
  };
  return (
    <VStack flex={1} space={20} justifyContent={"center"} alignItems={"center"}>
      <Text variant="displayMedium" style={{ color: "black" }}>
        login
      </Text>
      <TextInput
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
        style={{ width: "90%" }}
        label="Email"
        right={<TextInput.Icon icon={"email"} />}
      />
      <TextInput
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
        style={{ width: "90%" }}
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      {authStore.draft.logging ? (
        <ActivityIndicator size={40} color={"black"} />
      ) : (
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      )}
    </VStack>
  );
};

export default observer(Login);
