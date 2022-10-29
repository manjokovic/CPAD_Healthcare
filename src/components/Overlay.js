import React,{useState,useEffect} from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const Overlay = (props) => {
  const [visible, setVisible] = useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    
  },[visible]);


  return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{props.name}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={hideDialog}>Add to Cart</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default Overlay;