import React from 'react';
import { Alert, Text, Button } from 'native-base';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Alert isOpen={visible} onClose={onClose}>
      <Text>{message}</Text>
      <Button onPress={onClose} full>
        <Text>OK</Text>
      </Button>
    </Alert>
  );
};

export default CustomAlert;