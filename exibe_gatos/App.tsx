import { useState } from 'react';
import { 
  FlatList,
  Image,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

interface Images{
  id: string;
  url: string;
}
export default function App() {
  const [images, setImages] = useState<Images[]>([])
const gen = () => {
  const newImg: Images = {
    id: '1',
    url: 'https://reactnative.dev/img/tiny_logo.png'
  }
  setImages(imagesCurrent => [
    newImg,
    ...imagesCurrent
  ])
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      Welcome to PhotoCats! Click the button below to view cat images</Text>
      <Pressable 
        style={styles.pressable}
        onPress={gen}>
          <Text style={styles.pressableText}>Show Cats</Text>
      </Pressable>
      <FlatList
        data={images}
        renderItem={image => (
          <Image
            style={styles.image} 
            source={{
              uri: image.item.url
            }}/>
        )}>
      </FlatList>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable:{
    backgroundColor: 'blue',
    width: '80%',
    padding: 8,
    borderRadius: 4,
    margin: 8
  },
  pressableText: {
    color: 'white',
    textAlign: 'center'
  },
  title:{
    marginTop: 20,
    textAlign: 'center'
  },
  image: {
    width: 60,
    height: 60,
  },
});
