import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import CardComponent from "../components/CardComponent";
import PageBackground from "../components/PageBackground";
import { Searchbar } from "react-native-paper";
import { React, useState, useEffect } from "react";
import { DataTable, Paragraph, Dialog, Portal } from "react-native-paper";
import Button from "../components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function OrderMedicine() {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableMedicines, setavailableMedicines] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);
  const [txns, settxns] = useState([]);
  const getTxns = () => {
    try {
      axios
        .get("http://10.0.2.2:5000/api/Orders/GetOrdersByCustID/1")
        .then((response) => {
          // console.log(response.data)
          settxns(response.data.splice(-3))
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {

    }

  };
  const getMedicines = () => {
    try {
      axios
        .get("http://10.0.2.2:5000/api/Medicines")
        .then((response) => {
          // console.log(response.data)
          setavailableMedicines(response.data);
        })
      // .catch(error => console.log(error));
    } catch (error) {
      // console.error(error);
    } finally {

    }

  };

  useEffect(() => {
    getMedicines()
    getTxns()
  }, []);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <PageBackground>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Available Medicine</Text>
          </View>
          <View style={styles.body}>
            {searchQuery
              ? availableMedicines.map((medicine, index) => {
                if (
                  medicine.medicineName
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return (
                    <CardComponent
                      key={index}
                      name={medicine.medicineName}
                    ></CardComponent>
                  );
                }
              })
              : availableMedicines.map((medicine, index) => {
                return (
                  <CardComponent key={index} name={medicine.medicineName}></CardComponent>
                );
              })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Last 3 Orders</Text>
        </View>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.txntext}>
              Medicine
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.txntext}>
              Quantity
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.txntext}>
              Total Cost
            </DataTable.Title>
          </DataTable.Header>

          {
            txns.length != 0 ?
              txns.map((txn, index) => {
                console.log(txn)
                return (<DataTable.Row key={Math.floor(Math.random() * 10000)}>
                  <DataTable.Cell key={Math.floor(Math.random() * 10000)}>{txn.medicineName}</DataTable.Cell>
                  <DataTable.Cell numeric key={Math.floor(Math.random() * 10000)}>{txn.quantity}</DataTable.Cell>
                  <DataTable.Cell numeric key={Math.floor(Math.random() * 10000)}>{txn.totalCost}</DataTable.Cell>
                </DataTable.Row>)

              }) : <Text>No active transactions</Text>
          }
        </DataTable>
      </View>

      <View style={styles.cartContainer}>
        <TouchableOpacity onPress={showDialog}>
          <Ionicons name={"cart"} size={20} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={showDialog}>
          <Button>Cart</Button>
        </TouchableOpacity>
        {visible && (
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Cart</Dialog.Title>
                <Dialog.Content>
                  <View>
                    <Text >Paracetamol : 10</Text>
                    <Text >Paracetamol : 10</Text>
                    <Text >Paracetamol : 10</Text>
                    <Text >Paracetamol : 10</Text>
                    <Text >Paracetamol : 10</Text>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Cancel</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        )}

      </View>
    </PageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  scrollview: {
    maxHeight: 350,
    marginBottom: 50,
  },
  header: {
    backgroundColor: "#225db5",
    minHeight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
  body: {
    padding: 20,
  },
  txnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txnheader: {
    backgroundColor: "#225db5",
  },
  txntext: {
    fontFamily: "serif",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});
export default OrderMedicine;
