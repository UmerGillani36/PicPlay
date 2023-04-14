import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  Button,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation()
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
        setImage(result.assets[0].uri);
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
        date: new Date().getTime(),
      };
      await AsyncStorage.setItem('posts', JSON.stringify([...posts, post]));
      setPosts([...posts, post]);
      setText('');
      setImage(null);
    } else {
      if (!text) {
        Alert.alert('Please enter something first to post');
      } else {
        Alert.alert('Please Select an image to proceed');
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
  console.log('Posts: ', posts);
  console.log('Image: ', image);
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <Appbar.Header elevated style={styles.header}>
          <Appbar.Content title='Play Pic' titleStyle={styles.logo} />
          <TouchableOpacity onPress={() =>

            navigation.navigate("Profile")
          }>
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
          <Button
            title='Select Image'
            onPress={pickImage}
            style={{ marginBottom: 10 }}
          />
          {image && <Image source={{ uri: image.uri }} style={styles.image} />}
          <Button title='Upload' onPress={uploadPost} style={styles.buttons} />
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.postText}>{item.text}</Text>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
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
    // width: '80%',
    // marginTop: 10,
    // marginBottom: 10,
    // backgroundColor: '#FAFAFA',
  },
  containerImage: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#f5f5f5',
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
    resizeMode: 'contain',
  },
});

export default Home;
