import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import {Text} from 'react-native-paper'
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [autheticated, setauthenticated] = useState(false);

  const getAuth = () => {
    try {
      axios
        .get("http://10.0.2.2:5000/api/Customers")
        .then((response) => {
          // console.log(response.data)
          response.data.map((user)=>{
            // console.log(user.custEmail,email.value ,user.custPpassword,password.value )
              if(user.custEmail===email.value && user.custPpassword===password.value)
              {
                setauthenticated(true);
                console.log("---"+autheticated)
              }
          })
        })
         .catch(error => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {

    }

  };

  useEffect(() => {
    // console.log("Authenticated :"+autheticated)
  }, [autheticated]);


  const onLoginPressed = () => {
    getAuth()
    console.log("Authenticated :"+autheticated)
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    if(autheticated===true)
    {
      navigation.reset({
        index: 0,
        routes: [{ name: "MST Healthcare" }],
      });
    }
    else{
      setEmail({ ...email, error: "Invalid credentials" });
      setPassword({ ...password, error: "Invalid credentials" });
      return;
    }

  };
  return (
    <Background>
      <Logo />
      <Header>Welcome to MST Healthcare Application.</Header>
      <Text> Please login with your credentials</Text>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },

  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
