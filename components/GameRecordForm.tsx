import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { saveGameRecord } from '../utils/Database';
import { validateGameRecord } from '../utils/DataValidation';
import { type GameRecord } from '../models/GameRecord';


export const GameRecordForm: React.FC = () => {
  const [record, setRecord] = useState<GameRecord>();

  const handleSubmit = () => {
    if (validateGameRecord(record!)) {
      saveGameRecord(record!);
    } else {
      // Show error
    }
  };

  return (
    <View>
      {/* Form elements like TextInput to collect data */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});