import React from "react";
import {View,Text, StyleSheet} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const Profile =({profiles}) =>{
    if(profiles.lenght <= 3){
        return(
            <View style={style.container}>
                {profiles.map((item,index)=>(
                    <View
                    key={`profile-${index}`}
                    style={index == 0 ? null : {marginLeft:-15}}
                    >
                        <Image source={item.profile}
                        resizeMode="cover"
                        style={
                            style.profileImages
                        }
                        />
                    </View>

                ))}

            </View>

        )
    }else{
          return(
        <View style={style.container}>
            {profiles.map((index,item)=>{
                if(index<=2){
                    <View
                    key={`profile-${index}`}
                    style={index == 0 ? null : {marginLeft:-15}}
                    ><Image source={item.profile}
                    resizeMode="cover"
                    style={
                        style.profileImages
                    }
                    /></View>

                }
    })}
    <Text style={{marginLeft:SIZES.base,...FONTS.body3,color:COLORS.white}}>+{profiles.lenght -3}</Text>

        </View>
    )
    }
  
}

const style=StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center"
    },
    profileImages:{
        width:40,
        height:40,
        borderRadius:20,
        borderWidth:2,
        borderColor:COLORS.black
    }
})


export default Profile;