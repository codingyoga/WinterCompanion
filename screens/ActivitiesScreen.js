import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const winterActivities = [
  { id: '1', name: 'Ice Skating', type: 'outdoor', locations: ['City Park Rink', 'Indoor Ice Arena'] },
  { id: '2', name: 'Snowshoeing', type: 'outdoor', locations: ['National Park Trails', 'City Forest'] },
  { id: '3', name: 'Table Tennis', type: 'indoor', locations: ['Community Center', 'Sports Club'] },
  { id: '4', name: 'Indoor Rock Climbing', type: 'indoor', locations: ['Climb Time Gym', 'Vertical World'] },
  { id: '5', name: 'Cross-country Skiing', type: 'outdoor', locations: ['Winter Sports Park', 'Nordic Center'] },
  // Add more activities as needed
];

const ActivitiesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(winterActivities);

  useEffect(() => {
    const results = winterActivities.filter(activity =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(results);
  }, [searchTerm]);

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity style={styles.activityItem} onPress={() => showActivityDetails(item)}>
      <Text style={styles.activityName}>{item.name}</Text>
      <Text style={styles.activityType}>{item.type}</Text>
    </TouchableOpacity>
  );

  const showActivityDetails = (activity) => {
    // In a real app, this could open a modal or navigate to a details screen
    alert(`${activity.name}\n\nLocations:\n${activity.locations.join('\n')}\n\nFind local communities for ${activity.name} at meetup.com or facebook.com/events`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search activities..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityItem}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  activityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ActivitiesScreen;