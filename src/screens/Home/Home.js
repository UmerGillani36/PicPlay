import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } else {
      alert('Permission to access media library is required');
    }
  };

  const uploadPost = async () => {
    if (text && image) {
      const post = {
        text,
        image,
        date: new Date().toDateString(),
      };
      await AsyncStorage.setItem('posts', JSON.stringify([...posts, post]));
      setPosts([...posts, post]);
      setText('');
      setImage(null);
    } else {
      if (!text) {
        Alert.alert('Please Write something to post');
      } else {
        Alert.alert('Please Select Image in order to proceed');
      }
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await AsyncStorage.getItem('posts');
      if (postsData) {
        setPosts(JSON.parse(postsData));
      }
    };
    getPosts();
  }, []);
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <Appbar.Header elevated style={styles.header}>
          <Appbar.Content title='Play Pic' titleStyle={styles.logo} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.tinyLogo}
              source={require('./../../../assets/profile.png')}
            />
          </TouchableOpacity>
        </Appbar.Header>
        <View style={styles.containerImage}>
          <TextInput
            style={styles.textInput}
            placeholder='Write something..'
            value={text}
            onChangeText={(value) => setText(value)}
          />
          <TouchableOpacity onPress={pickImage} style={styles.buttons}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image.uri }} style={styles.image} />}
          <TouchableOpacity onPress={uploadPost} style={styles.buttons}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Text style={styles.postText}>{item.text}</Text>
                  <Text style={styles.postText}>{item.date}</Text>
                </View>
                {item.image && (
                  <Image
                    source={{ uri: item.image.uri }}
                    style={styles.postImage}
                  />
                )}
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    display: 'flex',
  },
  logo: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  captureView: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  buttons: {
    width: '99%',
    height: 40,
    borderRadius: 5,
    // marginTop: 10,
    // marginBottom: 10,
    color: '#000',
    backgroundColor: '#FAFAFA',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 8,
  },
  containerImage: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  textInput: {
    height: 80,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  postContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  postText: {
    fontSize: 18,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
});

export default Home;
