import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AllExpenses } from "./screens/AllExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { ManageExpenses } from "./screens/ManageExpenses";
import { RecentExpenses } from "./screens/RecentExpenses";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import { IconButton } from "./components/UI/IconButton";
import { ExpensesContextProvider } from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpenses")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
          title: "All Expenses",
          tabBarLabel: "All Expenses",
        }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Expenses"
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Expenses"
              component={BottomTabsNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
