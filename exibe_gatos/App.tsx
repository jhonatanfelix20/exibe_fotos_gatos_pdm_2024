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
    
  }
  const remover = (id: string) => {
    setImages(imagesCurrent => imagesCurrent.filter(i => i.id !== id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      Welcome to PhotoCats!</Text> 
      <Text style={styles.text}>Click the button below to view cat images.</Text>

      <Pressable 
        style={styles.pressable}
        onPress={gen}>
          <Text style={styles.pressableText}>Show Cats</Text>
      </Pressable>

      <FlatList
        style={styles.imageList}
        data={images}
        keyExtractor={item => item.id}
        renderItem={image => (
          <View>
            <Image
              style={styles.image} 
              source={{
                uri: image.item.url
              }}/>
            <Pressable 
              style={styles.pressableRemover}
              onPress={() => remover(image.item.id)}>
                <Text style={styles.pressableText}>Remover este gato</Text>
            </Pressable>
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

  text:{
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

  pressableRemover:{
    backgroundColor: 'red',
    width: '95%',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginBottom: 10
  },

  pressableText: {
    color: 'white',
    textAlign: 'center'
  },

  imageList:{
    width: '80%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8
  },

  image: {
    margin: 8,
    width: '95%',
    aspectRatio: 1,
  },

});
