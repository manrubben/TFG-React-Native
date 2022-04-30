import React, {useContext} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {ImageBackground} from "react-native-web";
import {AuthContext, getValue, removeItem} from "../helpers/AuthContext";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
    const { authState, setAuthState } = useContext(AuthContext);

    const logout = async () => {
        try {
            console.log("Logout")
            removeItem("accessToken")
            setAuthState({
                username: "",
                id: 0,
                rol: "",
                status: false,
            })
            props.navigation.navigate("Home")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: ''}}>
                <Image source={require('../images/user-profile.jpg')} style={{height:80, width:80, borderRadius:40, marginBottom:10, marginLeft: 20}}/>
                <Text style={{marginBottom:20, marginLeft: 20, fontSize:18}}>{authState.username}</Text>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            {authState.status &&
                <>
                    <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                        <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="exit-outline" size={22}/>
                                <Text style={{fontSize: 15, marginLeft: 5}}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            }

        </View>

    )
}

export default CustomDrawer;
