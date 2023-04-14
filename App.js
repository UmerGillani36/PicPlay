import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./src/screens/Home/Home";
import Profile from './src/screens/Profile/Profile'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);
