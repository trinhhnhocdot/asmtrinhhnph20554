import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { TextInput } from 'react-native-gesture-handler'



const Signup = (props) => {
   const [newuser, setnewuser] = useState("")
   const [newpass, setnewpass] = useState("")
   const [checkpass, setcheckpass] = useState("")
  
   const SaveProduct = () => {
    if (newuser.length == 0) {
        alert("chưa nhập usser name");
        return;
      }
      if (newpass.length == 0) {
        alert("chưa nhập Password");
        return;
      }
      if(newpass!=checkpass){
        alert("vui long nhap pass giong nhau ")
        return;
      }
    // tạo đối tượng dữ liệu 
    let objuser = { username: newuser, password: newpass };
    let url_aip = "http://192.168.0.106:3000/tb_users";

    fetch(url_aip, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objuser),
    })
        .then((res) => {
            if (res.status == 201) {        
                alert("Dang ki thanh cong ")
            }

        })
        .catch((e) => {
            console.log(e);
        })

}
    return (
        <View style={styles.container}>
            <Text style={styles.textsignup}>Sign Up</Text>

            <View style={styles.viewinput}>
                <TextInput style={styles.txtinput} placeholder='User name' onChangeText={(txt) => { setnewuser(txt) }} />
                <TextInput style={styles.txtinput} placeholder='Password'  onChangeText={(txt) => { setnewpass(txt) }}/>
                <TextInput style={styles.txtinput} placeholder='Confirm password' onChangeText={(txt) => { setcheckpass(txt) }} />
                
            </View>
            <View style={styles.txtLoggin}>
                <Text style={{color:"white"}}>Already a member?</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                    <Text style={styles.textLogin}>Log In</Text>
                </TouchableOpacity>
            </View>
                <View style={{alignItems: 'center',}}>
            <TouchableOpacity style={styles.btnsignup} onPress={SaveProduct}  >
              <Text style={styles.txtsignnn}>Sign Up</Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    txtsignnn:{
        color: 'white',
        fontWeight: 'bold',
    },
    btnsignup:{
        borderRadius: 5,
    backgroundColor: '#0bd28a',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    },
    textLogin:{
        color: "#0bd28a",
        fontWeight: 'bold',
    },
    txtLoggin:{
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop:25,
    },
    txtinput: {
        borderBottomWidth: 1,
        borderColor: 'white',
        width: 270,
        color: 'white',
        marginLeft: 45,
        fontSize: 15,
        marginTop: 20,
    },
    viewinput: {
        alignItems: 'stretch',
        marginTop: 30,
        // justifyContent: 'flex-end',
    }
    ,
    container: {
        flex: 1,    
        backgroundColor: '#333542', 
    },
    textsignup: {
        fontSize: 30,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginTop: 70,
    }
})