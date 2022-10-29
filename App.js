import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/screens/Dashboard";
import BookAppointment from "./src/screens/BookAppointment";
import BookLabAppoint from "./src/screens/BookLabAppoint";
import OrderMedicine from "./src/screens/OrderMedicine";
import { Provider } from "react-native-paper";
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    options={{
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
    }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "ios-globe" : "ios-globe-outline";
          } else if (route.name === "Doctor Appointment") {
            iconName = focused ? "ios-git-network" : "ios-git-network-outline";
          } else if (route.name === "Lab Appointment") {
            iconName = focused ? "ios-pulse" : "ios-pulse-outline";
          } else if (route.name === "Order Medicine") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Doctor Appointment" component={BookAppointment} />
      <Tab.Screen name="Lab Appointment" component={BookLabAppoint} />
      <Tab.Screen name="Order Medicine" component={OrderMedicine} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
           name="MST Healthcare"
           component={TabNavigator}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
