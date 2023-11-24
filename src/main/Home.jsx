import { observer } from "mobx-react";
import VStack from "../cpn/layout/VStack";
import authStore from "../store/AuthStore";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import scheduleStore from "../store/ScheduleStore";
import { Button, Icon, TextInput } from "react-native-paper";
import { ROLES } from "../enum/role";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";

import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
const Home = () => {
  const { user } = authStore;
  const nav = useNavigation();
  const [showModal, setShowModel] = useState(false);
  const StudentItem = () => {};
  const [openTime, setOpenTime] = useState(false);
  const [value, setValue] = useState("");
  const [time, setTime] = useState({ timeStart: 0, timeEnd: 0 });

  useLayoutEffect(() => {
    scheduleStore.listenSchedule(authStore.user.id);
  }, []);
  useLayoutEffect(() => {}, [scheduleStore.schedules]);

  const ScheduleItem = ({ it }) => {
    return <Text>{it?.user?.name}</Text>;
  };
  const role = authStore.user.role;

  const handleGenerateCode = () => {
    if (isNaN(parseInt(time.timeStart)) || isNaN(parseInt(time.timeEnd))) {
      Alert.alert("Error", "Time InValid");
      return;
    }
    if (parseInt(time.timeEnd) < parseInt(time.timeStart)) {
      Alert.alert("Error", "Time InValid");
      return;
    }
    if (parseInt(time.timeEnd) > 23 || parseInt(time.timeEnd) < 0) {
      Alert.alert("Error", "Time InValid");
      return;
    }
    if (parseInt(time.timeStart) > 23 || parseInt(time.timeStart) < 0) {
      Alert.alert("Error", "Time InValid");
      return;
    }
    let startCheck = new Date();
    let endCheck = new Date();
    startCheck.setHours(time.timeStart);
    endCheck.setHours(time.timeEnd);
    const data = {
      start: startCheck.getTime(),
      end: endCheck.getTime(),
      teacherId: authStore.user.id,
    };
    setValue(JSON.stringify(data));
  };

  return (
    <VStack flex={1} justifyContent={"center"} alignItem={"center"}>
      {role == ROLES.TEACHER ? (
        <>
          <Text style={{ fontSize: 26, marginVertical: 20, marginLeft: 10 }}>
            Students took attendance
          </Text>
          <Text style={{ fontSize: 18, marginVertical: 20, marginLeft: 10 }}>
            Teacher : {authStore.user.name}
          </Text>
          <ScrollView>
            {scheduleStore.schedules.map((sc) => {
              return <ScheduleItem it={sc} />;
            })}
          </ScrollView>
          {showModal && (
            <TouchableOpacity
              onPress={() => {
                setShowModel(false);
                setValue("");
              }}
              activeOpacity={1}
              style={{
                width: "100%",
                borderRadius: 6,
                height: "100%",
                backgroundColor: "rgba(0,0,0,.6)",
                display: "flex",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                zIndex: 10,
              }}
            >
              <View
                style={{
                  width: "80%",
                  borderRadius: 6,
                  height: "80%",
                  backgroundColor: "white",
                  zIndex: 10,
                  paddingHorizontal: 6,
                  display: "flex",
                  paddingVertical: 30,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <TextInput
                  onChangeText={(text) => setTime({ ...time, timeStart: text })}
                  placeholder="Enter hours start"
                  style={{ width: "100%", height: 40 }}
                />
                <TextInput
                  onChangeText={(text) => setTime({ ...time, timeEnd: text })}
                  placeholder="Enter hours end"
                  style={{ width: "100%", height: 40, marginVertical: 12 }}
                />
                <Button
                  onPress={handleGenerateCode}
                  style={{ marginVertical: 20 }}
                >
                  Generate
                </Button>
                {value !== "" && <QRCode size={200} value={value} />}
              </View>
            </TouchableOpacity>
          )}

          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            {openTime && (
              <RNDateTimePicker
                mode="time"
                onChange={setDate}
                value={new Date()}
                maximumDate={new Date()}
              />
            )}
            {!showModal && (
              <Button
                onPress={() => {
                  setShowModel(true);
                }}
                mode="contained"
              >
                Generate Code
              </Button>
            )}
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 26, textAlign: "center", width: "100%" }}>
            Student : {authStore.user.name}
          </Text>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Button
              mode="contained"
              onPress={() => {
                nav.navigate("scanner");
              }}
            >
              Attendance
            </Button>
          </View>
        </>
      )}
    </VStack>
  );
};
export default observer(Home);
