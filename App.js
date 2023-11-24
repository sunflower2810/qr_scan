import { PaperProvider } from "react-native-paper";
import MainApp from "./src/Main";
import { LogBox } from "react-native";
export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <PaperProvider>
      <MainApp />
    </PaperProvider>
  );
}
