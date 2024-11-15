import { useState } from 'react';
import { TheCatAPI } from '@thatapicompany/thecatapi';
import { API_KEY } from '@env';
import { 
  FlatList,
  Image,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

const catApi = new TheCatAPI (API_KEY)

interface Images{
  id: string;
  url: string;
}
export default function App() {
  const [images, setImages] = useState<Images[]>([])

  async function gen() {
    const search = await catApi.images.searchImages({
      limit: 5,
    }).then(result => setImages(imageCurrent => [
      ...result,
      ...imageCurrent
    ]))
    
    console.log(search)
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
          <View>
            <Image
              style={styles.image} 
              source={{
                uri: image.item.url
              }}/>
          </View>
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

  title:{
    marginTop: 20,
    textAlign: 'center'
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

  imageView:{
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8
  },

  image: {
    margin: 8,
    width: 200,
    height: 200,
  },

});
