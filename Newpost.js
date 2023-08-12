import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { launchCamera } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const Newpost = (prop) => {
  const [img_source, setimg_source] = useState(null)
  const [img_base64, setiimg_base64] = useState(null)
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh 
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setiimg_base64("data:image/" + file_ext + ";base64," + res);
          console.log(img_base64);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });


    }


  }

  const Saveproduct = () => {
    let objpots = { image: img_source, title: title, content: content }

    let url_api = "http://172.20.10.6:3000/tb_listtintuc"
    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objpots),
    })
      .then((res) => {
        if (res.status == 201) {
          alert("theem thanh cong")
        }

      })
      .catch((e) => {
        console.log(e);
      })
  }




  return (
    <View style={{
     padding:15,
     backgroundColor: '#333542',
      flex:1
    }}>
      <TouchableOpacity onPress={pickImage} >
        <Image source={require('./image/add-image.png')} style={{ width: 50, height: 50 }} />

      </TouchableOpacity>


      {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 100, height: 100 }} />}

      <View>
        <TextInput style={styles.textinput} placeholder='Tiêu đề: ' onChangeText={(txt) => { settitle(txt) }} />

        <Text style={{height:50,backgroundColor:"white",borderBottomWidth:1}}>    </Text>
        
        <TextInput style={styles.textinput11}  placeholder='Nội dung: ' onChangeText={(txt) => { setcontent(txt) }} />
        <Text style={{height:150,backgroundColor:"white",borderBottomWidth:1}}>    </Text>
      </View>



      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity style={styles.btnupload} onPress={Saveproduct} >
          <Text style={{ color: "white", }}>Up load bài viết </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Newpost

const styles = StyleSheet.create({
  textinput11: {
    
    backgroundColor: "white",
    
  },
  textinput: {
   
    backgroundColor:"white"
  },

  btnupload: {

    borderRadius: 5,
    backgroundColor: '#0bd28a',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
})