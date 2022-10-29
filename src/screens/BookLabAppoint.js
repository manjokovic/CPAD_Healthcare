import { Text, View , StyleSheet} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";

function BookLabAppoint() {
  return (
    <Background>
      <Logo/>
      <View>
        <Text style={styles.text}>Page Under Construction</Text>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight : "bold",
  }
});
export default BookLabAppoint;