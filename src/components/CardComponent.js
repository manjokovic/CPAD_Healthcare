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

export default function CardComponent(props) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [snackvisible, setsnackVisible] = useState(false);

  const onToggleSnackBar = () => setsnackVisible(true);

  const onDismissSnackBar = () => setsnackVisible(false);

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
                  <TextInput style={styles.textinp} keyboardType="numeric" />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={onToggleSnackBar}>Refill</Button>
                <Button onPress={hideDialog}>Add to Cart</Button>
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
                  Medicine added to cart with last order quantity 10
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
