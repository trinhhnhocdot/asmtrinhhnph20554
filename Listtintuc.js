import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
const Listtintuc = (props) => {
    const [isLoadding, setisLoadding] = useState(true)
    const [dssp, setdssp] = useState([])

    const getListpro = async () => {
        
        let url_api ="http://172.20.10.6:3000/tb_listtintuc"
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
        return (

             <TouchableOpacity>
                <View style={styles.viewlist}>
                {/* <Image  source={require('../asmtrinhhnph20554/image/padlock.png')}/> */}
                <Image style={styles.imglist} source={{ uri: item.image }} />
                <View style={{paddingLeft:8 ,width: Dimensions.get('window').width-110}}>
                    <Text numberOfLines={3} style={{fontSize:16, color:"red",fontWeight:'bold',}}>{item.title}</Text>
                    <Text numberOfLines={3}> {item.content}</Text>
                   
                </View>
                </View>
             </TouchableOpacity>
           
    
        );
    }


    //   React.useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', () => {
    //         // khi màn hình được hiển thị sẽ gọi vào hàm này
    //         // gọi hàm load dữ liệu
    //         getListpro();
    //     });


    //     return unsubscribe;
    // }, [props.navigation]);
    React.useEffect(() => {
        getListpro();
    }, []);
    return (
        <View style={styles.container}>

          
            <View>
                <FlatList style={styles.listshow}
                    data={dssp}
                    keyExtractor={(itemtintuc) => { return itemtintuc.id }}
                    renderItem={renderproduct} />
            </View>
        </View>
    )
}

export default Listtintuc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,

    },
    imglist: {
        width: 96,
        height: 96,
        borderRadius: 8,
    },
    viewlist: {
       marginTop:10,
        flexDirection: "row",
        borderBottomWidth:0.5,
      
    },
})