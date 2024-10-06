import React from 'react';
import { View, Text, FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';

const mentalHealthResources = [
  { id: '1', name: 'Crisis Services Canada', phone: '1-833-456-4566', website: 'https://www.crisisservicescanada.ca/' },
  { id: '2', name: 'Canadian Mental Health Association', phone: '416-646-5557', website: 'https://cmha.ca/' },
  { id: '3', name: 'Kids Help Phone', phone: '1-800-668-6868', website: 'https://kidshelpphone.ca/' },
  { id: '4', name: 'Hope for Wellness Helpline', phone: '1-855-242-3310', website: 'https://www.hopeforwellness.ca/' },
  { id: '5', name: 'Wellness Together Canada', phone: '', website: 'https://wellnesstogether.ca/en-CA' },
  // Add more resources as needed
];

const ResourcesScreen = () => {
  const renderResourceItem = ({ item }) => (
    <View style={styles.resourceItem}>
      <Text style={styles.resourceName}>{item.name}</Text>
      {item.phone && (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
          <Text style={styles.resourcePhone}>{item.phone}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
        <Text style={styles.resourceWebsite}>Visit Website</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mental Health Resources</Text>
      <Text style={styles.disclaimer}>
        If you're experiencing a mental health crisis, please call 911 or go to your nearest emergency department.
      </Text>
      <FlatList
        data={mentalHealthResources}
        renderItem={renderResourceItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 14,
    color: 'red',
    marginBottom: 15,
  },
  resourceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  resourceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resourcePhone: {
    fontSize: 16,
    color: 'blue',
    marginTop: 5,
  },
  resourceWebsite: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
});

export default ResourcesScreen;