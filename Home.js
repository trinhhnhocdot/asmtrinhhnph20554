import { StyleSheet, Text, View, FlatList, Modal, Image, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Newpost from './Newpost'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



//
const Home = (props) => {
  const [showdialodmodal, setshowdialodmodal] = useState(false);
  const [isLoadding, setisLoadding] = useState(true)
  const [dssp, setdssp] = useState([])


  const [img_source, setimg_source] = useState(null)
  const [img_base64, setiimg_base64] = useState(null)
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const getListpro = async () => {

    // http://10.24.25.184:3000/tb_listtintuc
    
    let url_api = "http://192.168.1.10:3000/tb_listtintuc"
    try {
      const response = await fetch(url_api); // load dữ liệu 
      const json = await response.json();// chuyển dữ liệu sang json
      setdssp(json)// đổ dữ liệu vào state

    } catch (error) {
      console.error(error);
    } finally {
      setisLoadding(false);
    }
  }

  const renderproduct = ({ item }) => {
    const xoabai = () => {
      let url_xoa = "http://192.168.1.10:3000/tb_listtintuc/" + item.id;
      fetch(url_xoa, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      })
        .then((res) => {
          if (res.status == 200) {
            getListpro()
            alert("Xóa thành công ")
          }

        })
        .catch((e) => {
          console.log(e);
        })
    }

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

    const Updateproduct = () => {
      let objpots = { image: img_source, title: title, content: content }
      let url_api = "http://192.168.1.10:3000/tb_listtintuc/" + item.id
      fetch(url_api, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objpots),
      })
        .then((res) => {
          if (res.status == 200) {

            alert("sua thanh cong")
            getListpro();
          }

        })
        .catch((e) => {
          console.log(e);
        })
    }
    return (
      <View>
        <Modal visible={showdialodmodal} transparent={true} animationType="fade">
          <View style={styles.khungdialog}>
            <TouchableOpacity style={{marginLeft:265}} onPress={() => { setshowdialodmodal(false) }} >
              <Image source={require('./image/out.png')} style={{ width: 19, height: 19 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage} >
              <Image source={require('./image/chonanh.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>

            <TextInput style={{ backgroundColor: "white" }} placeholder='Tiêu đề mới: ' onChangeText={(txt) => { settitle(txt) }} value={title} />

            <Text style={{ height: 20, backgroundColor: "white" }}>  </Text>
            <TextInput style={{ backgroundColor: "white", marginTop: 10 }} placeholder='Nội dung mới:' onChangeText={(txt) => { setcontent(txt) }} value={content} />
            <Text style={{ height: 150, backgroundColor: "white" }}>  </Text>
            <TouchableOpacity style={styles.btnsua} onPress={Updateproduct}  >
              <Text style={{ color: "white", fontSize: 13 }}> Sửa</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Chitiet',{item})}}>

      
        <View style={styles.viewlist}>
          {/* <Image  source={require('../asmtrinhhnph20554/image/padlock.png')}/> */}
          <Image style={styles.imglist} source={{ uri: item.image }} />
          <View style={{ paddingLeft: 8, width: Dimensions.get('window').width - 110 }}>
            <Text numberOfLines={3} style={{ fontSize: 16, color: "green", fontWeight: 'bold', }}>{item.title}</Text>
            <Text numberOfLines={3} style={{ color: "white" }}> {item.content}</Text>


            <View style={styles.itemmm}>
              <TouchableOpacity onPress={xoabai}>
                <Image style={{ width: 15, height: 15 }} source={require('./image/trash-bin.png')} />
                <Text ></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setshowdialodmodal(true) }} >
                <Image style={{ width: 12, height: 12, marginTop: 3, marginLeft: 5 }} source={require('./image/paper.png')} />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        </TouchableOpacity>


      </View>
    );
  }


  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình được hiển thị sẽ gọi vào hàm này
      // gọi hàm load dữ liệu
      getListpro();
    });


    return unsubscribe;
  }, [props.navigation]);


  return (
    <View style={styles.container}>

     <View  style={{  flexDirection: "row",marginTop:30,marginLeft:300}}>
      <View>
     <TouchableOpacity  onPress={() => { props.navigation.navigate('Newpost') }}>
        <Image style={{ width: 30, height: 30 }} source={require('../asmtrinhhnph20554/image/plus.png')} />
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Setiing') }}>
        <Image style={{ width: 30, height: 30 }} source={require('../asmtrinhhnph20554/image/setting.png')} />
      </TouchableOpacity>
      </View>
     </View>
   

      <View>
        <FlatList style={styles.listshow}
          data={dssp}
          keyExtractor={(itemtintuc) => { return itemtintuc.id }}
          renderItem={renderproduct} />
      </View>




    </View>



  )
}

export default Home

const styles = StyleSheet.create({
  btnsua: {
    borderRadius: 5,
    // backgroundColor: '#0bd28a',
    backgroundColor: "black",
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft:40
  },
  container: {
    flex: 1,
    backgroundColor: '#333542',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

  },
  imglist: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  itemmm: {
    flexDirection: "row",
  },
  viewlist: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 0.5,

  },

  dangbai: {
    marginTop: 30,
    paddingLeft: 320,
    paddingTop: 20,
    paddingBottom: 10

  },
  khungdialog: {
    backgroundColor: "pink",
    padding: 10,
    width: 300,
    height: 400,
    marginTop: 100,
    marginLeft: 35
  },
})