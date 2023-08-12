import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';







const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");


  const doLogin = () => {
    if (username.length == 0) {
      alert("chưa nhập usser name");
      return;
    }
    if (password.length == 0) {
      alert("chưa nhập Password");
      return;
    }
    // thực hoeenj fech để lấy dữ liệu về 
    
    let url_check_Login = "http://172.20.10.6:3000/tb_users?username=" + username;
       fetch(url_check_Login)
      .then((res) => { return res.json(); })
      
      .then(async (res_login) => {//trả về một mảng gồm username, passwd, name 

        if (res_login.length != 1) {//chỉ lấy 1 cái thôi lấy nhiều cái là sai 

          alert("sai Username hoặc lỗi trùng lặp dữ liệu ");
          return;
        } else {// lấy được đúng bắt đầu kiểu tra pass 
          let objU = res_login[0];

          if (objU.password != password) {
            alert("sai Password");
            return;

          } else {// đúng pass
            try {
              await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
              // chuyển sang màn hình home 
              if(username=="admin"){
            
                props.navigation.navigate('Home')
              }else{

                props.navigation.navigate('Listtintuc')
              }
              
            } catch (e) {
              alert("hihihi")
            }
          }

        }
      })
  }
  return (
    <View style={styles.container}>


      <Text style={styles.textwelcome}>WELCOME</Text>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity style={styles.buttoncamera}>
          <Image style={styles.imagecamera} source={require('./image/camera.png')} />

          <Text >Your Photo</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <View style={styles.mail}>

            <Image style={styles.imgmail} source={require('./image/mail.png')} />
            <TextInput style={styles.textinput} placeholder='User name' onChangeText={(txt) => { setusername(txt) }}  />
          </View>
          <View style={styles.mail}>
            <Image style={styles.imgmail} source={require('./image/padlock.png')} />
            <TextInput style={styles.textinput}  placeholder='PassWord' onChangeText={(txt) => { setpassword(txt) }}  />
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <TouchableOpacity style={styles.btnsignin} onPress={doLogin} >
              <Text style={styles.textsignin}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        {/*  */}

      </View>
      <View style={styles.viewsingup}>
        <Text style={styles.textsignup}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => { props.navigation.navigate('Signup') }} >
          <Text style={styles.textsignup1}>Sign up</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  textsignup: {
    color: "white",
  },
  textsignup1: {
    color: "#0bd28a",
    fontWeight: 'bold',


  },
  viewsingup: {
    flexDirection: 'row',
    marginTop: 65,
    justifyContent: 'center',
  },
  textsignin: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnsignin: {
    borderRadius: 5,
    backgroundColor: '#0bd28a',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mail: {
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 20,
    width: 300,
    backgroundColor: '#474955',
    alignItems: 'center',
    justifyContent: 'center',

  },
  imgmail: {
    width: 30,
    height: 30,
    marginRight: 7,

  },

  container: {
    flex: 1,
    backgroundColor: '#333542',
    flexDirection: 'column'
  },
  textinput: {
    height: 45,
    width: 250,

    color: ' #565864',
    backgroundColor: '#474955',
  },

  textwelcome: {

    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: 90,
  },

  imagecamera: {
    width: 60,
    height: 60,

  },

  buttoncamera: {
    backgroundColor: '#454754',
    width: 120,
    height: 120,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

})