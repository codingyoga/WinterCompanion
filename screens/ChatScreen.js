import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openAIApiKey;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages !== null) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now(), text: inputText, user: true };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    saveMessages(newMessages);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputText }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiMessage = { id: Date.now() + 1, text: response.data.choices[0].message.content, user: false };
      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.user ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    messageList: {
      flex: 1,
      padding: 10,
    },
    messageBubble: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#FFFFFF',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
    },
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007AFF',
      borderRadius: 20,
      paddingHorizontal: 20,
    },
    sendButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
  });

export default ChatScreen;