import { React, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Snackbar,
} from "react-native-paper";
import axios from "axios";

export default function CardComponent(props) {
  const [visible, setVisible] = useState(false);

  const [cart, setCart] = useState([]);

  const [quantity, setQuantity] = useState(0);

  const [snackBarMessage, setsnackBarMessage] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [snackvisible, setsnackVisible] = useState(false);

  const onToggleSnackBar = () => setsnackVisible(true);

  const onDismissSnackBar = () => setsnackVisible(false);

  const Refill = () => {
    try {
      // console.log("Name :"+props.medicineId)
      axios
        .post("http://10.0.2.2:5000/api/viewcarts/",{
          CartID:1,
          MedicineID:props.medicineId,
          MedicineName: props.name,
          Quantity: 10
        })
        .then((response) => {
          // console.log(response.data)
          setCart(oldArray => [...oldArray,response.data ])
          setsnackBarMessage("Medicine refilled with last ordered quantity : 10")
          onToggleSnackBar()
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {

    }

  }

  const addTocart = () => {
    try {
      // console.log("Name :"+props.medicineId)
      axios
        .post("http://10.0.2.2:5000/api/viewcarts/",{
          CartID:1,
          MedicineID:props.medicineId,
          MedicineName: props.name,
          Quantity: quantity
        })
        .then((response) => {
          // console.log(response.data)
          setCart(oldArray => [...oldArray,response.data ])
          setsnackBarMessage(props.name +" ordered with quantity : "+quantity)
          onToggleSnackBar()
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {

    }

  }

  useEffect(() => {}, [visible]);

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={showDialog}>
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>
      {visible && (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>{props.name}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This medicine does not need doctor's prescription</Paragraph>
                <View style={styles.container}>
                  <Text>Quantity :</Text>
                  <TextInput
                  label="Quantity"
                  value={quantity.value}
                  style={styles.textinp}
                  keyboardType="numeric"
                  onChangeText={(text) => setQuantity(text)}
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={Refill}>Refill</Button>
                <Button onPress={addTocart}>Add to Cart</Button>
              </Dialog.Actions>
              {snackvisible && (
                <Snackbar
                  visible={snackvisible}
                  onDismiss={onDismissSnackBar}
                  action={{
                    label: "Ok",
                    onPress: () => {
                      // Do something
                    },
                  }}
                >
                 {snackBarMessage}
                </Snackbar>
              )}
            </Dialog>
          </Portal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    padding: 5,
  },
  text: {
    color: "black",
    fontFamily: "serif",
    fontWeight: "600",
  },
  textinp: {
    borderColor: "black",
    marginLeft: 20,
    borderWidth: 1,
  },
  ingredients: {
    flex: 1,
  },
});
