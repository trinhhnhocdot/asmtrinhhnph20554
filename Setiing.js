import { StyleSheet, Text, View, FlatList, Image, Button, TouchableHighlight } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'



const Setiing = (props) => {
  const [load, setload] = useState(true)
  const [dsuser, setdsuser] = useState([])


  const getlistuser = async () => {

    let url_user = "http://172.20.10.6:3000/tb_users"
    try {
      const response = await fetch(url_user);

      const json = await response.json();
      setdsuser(json);

    } catch (error) {
      console.error(error);
    } finally {
      setload(false);
    }
  }

  const render_user = ({ item }) => {

    const xoauser = () => {
      let url_xoa = "http://172.20.10.6:3000/tb_users/" + item.id;
      fetch(url_xoa, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      })
        .then((res) => {
          if (res.status == 200) {
                getlistuser()
            alert("Xóa thành công ")
          }

        })
        .catch((e) => {
          console.log(e);
        })
    }
    return (
      <View style={{
        backgroundColor: "gray",
        marginTop: 20,
        width: 300,
        height: 70,
        marginLeft: 30,
        borderRadius: 10,
        paddingTop: 15,
        flexDirection: "row",
      }}>
        <View>
          <Text style={styles.textflat}>Username: {item.username} </Text>
          <Text style={styles.textflat}>Password: {item.password} </Text>
        </View>
        <View>

          <TouchableHighlight onPress={xoauser}>
            <Image style={{ width: 25, height: 25, marginLeft: 130 }} source={require('./image/remove-user.png')} />
          </TouchableHighlight>

        </View>



      </View>
    )
  }
  React.useEffect(() => {
    getlistuser();
  }, []);


  return (
    <View style={styles.container}>

      <FlatList data={dsuser}
        keyExtractor={(item_user) => { return item_user.id }}
        renderItem={render_user} />

      <TouchableHighlight style={styles.btnlogout} onPress={() => { props.navigation.navigate('Login') }} >
        <Text style={{color:"white",fontWeight:"bold"}}>Log Out</Text>
      </TouchableHighlight>
    </View>
  )
}

export default Setiing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333542',

  },
  textflat: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
  },
  btnlogout: {
    borderRadius: 5,
    backgroundColor: '#0bd28a',
    width: 230,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
      marginBottom:50,
      marginLeft:70
  },
})