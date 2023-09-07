import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateStatistics, type Statistics } from '../utils/Statistics';
import { fetchGameRecords } from '../utils/Database';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const StatisticsScreen = ({}: StackScreenProps<RootStackParamList, 'Statistics'>) => {
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    const fetchData = async () => {
      const records = await fetchGameRecords();
      const stats = generateStatistics(records);
      setStatistics(stats);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {statistics ? (
        <Text>Total Games: {statistics.totalGames}</Text>
        // Display other statistics
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StatisticsScreen;