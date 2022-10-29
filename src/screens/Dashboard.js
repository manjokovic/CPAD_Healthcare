import { React, useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import Logo from "../components/Logo";
import axios from "axios";

const Dashboard = () => {
  const [txns, settxns] = useState([]);
  let tempArr=[]
  const getTxns = () => {
    try {
      axios
        .get("http://10.0.2.2:5000/api/Orders/GetOrdersByCustID/1")
        .then((response) => {
          // console.log(response.data)
          for(let txn of response.data.reverse())
          {
            // console.log(txn)
            if(txn.orderStatus===false)
            {
              tempArr.push(txn)
            }
            if(tempArr.length>=3)
            {
              break;
            }
          }
          settxns(tempArr)
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {

    }

  };
  useEffect(() => {
    // console.log("Txs : " + txns)
    getTxns()
  }, []);

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <View style={styles.head}>
        <Text style={styles.headerText}>Last 3 active transactions</Text>
      </View>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title textStyle={styles.text}>Medicine</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.text}>
            Quantity
          </DataTable.Title>
          <DataTable.Title numeric textStyle={styles.text}>
            Status
          </DataTable.Title>
        </DataTable.Header>

        {
          txns.length!=0?
          txns.map((txn,index) => {
            return (<DataTable.Row key={Math.floor(Math.random() * 10000)}>
              <DataTable.Cell key={Math.floor(Math.random() * 10000)}>{txn.medicineName}</DataTable.Cell>
              <DataTable.Cell numeric key={Math.floor(Math.random() * 10000)}>{txn.quantity}</DataTable.Cell>
              <DataTable.Cell numeric key={Math.floor(Math.random() * 10000)}>In Progress</DataTable.Cell>
            </DataTable.Row>)

          }): <Text>No active transactions</Text>
        }
      </DataTable>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 0.2,
  },
  header: {
    backgroundColor: "#225db5",
  },
  text: {
    fontFamily: "serif",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  headContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  head: {
    backgroundColor: "#225db5",
    minHeight: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
});
