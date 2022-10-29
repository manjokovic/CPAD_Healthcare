import { React, useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet,View } from "react-native";
import Logo from "../components/Logo";

const optionsPerPage = [2, 3, 4];
const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];
const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <Logo style={styles.logo}/>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title textStyle={styles.text}>Dessert</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.text}>
            Calories
          </DataTable.Title>
          <DataTable.Title numeric textStyle={styles.text}>
            Fat
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dosa</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Pizza</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dosa</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Pizza</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>
        

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1 }-${to} of ${items.length}`}
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
          />
      </DataTable>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: .8,
    maxHeight: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo:{
    flex:.2
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
  pagination:{
    height:100
  }
});
