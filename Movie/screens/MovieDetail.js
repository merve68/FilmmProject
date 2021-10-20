import React from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,Image, StyleSheet,StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ProgressBar } from '../components';

const MovieDetail = ({navigation,route}) => {
    const [selectedMovie,setSelectedMovie] = React.useState(null)
    React.useEffect(()=>{
        let {selectedMovie} = route.params;
        setSelectedMovie(selectedMovie)
    })
    function renderHeaderBar(){
        return(
            <View style={{
                alignItems:"center",
                flexDirection:"row",
                justifyContent:"space-between",
                marginTop:20,
                paddingHorizontal:SIZES.padding
            }}>
                <TouchableOpacity style={{
                    height:40,
                    width:40,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:COLORS.transparentBlack,
                    borderRadius:20
                }}onPress={()=>navigation.goBack()}>
                    <Image
                    source={icons.left_arrow}
                    style={{
                        height:20,
                        width:20,
                        tintColor:COLORS.white
                    }}
                    />
                    
                </TouchableOpacity>
                <TouchableOpacity style={{
                    height:40,
                    width:40,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:COLORS.transparentBlack,
                    borderRadius:20
                }}onPress={()=>console.log("Share")}>
                    <Image
                    source={icons.upload}
                    style={{
                        height:25,
                        width:25,
                        tintColor:COLORS.white
                    }}
                    />
                    
                </TouchableOpacity>
                
            </View>
        )
    }
    function renderHeaderSection(){
        return(
            <ImageBackground source={selectedMovie?.details?.image}
            resizeMode="cover"
            style={{
                width:"100%",
                height:SIZES.height < 700 ? SIZES.height *0.6 : SIZES.height*0.7
            }}>
                <View style={{flex:1}}>{renderHeaderBar()}
                <View style={{flex:1,justifyContent:"flex-end"}}>
                    <LinearGradient
                    start={{x:0,y:0}}
                    end={{x:0,y:1}}
                    colors={["transparent" , "#000"]}
                    style={{
                        height:100,
                        width:"100%",
                        justifyContent:"flex-end",
                        alignItems:"center"
                    }}
                    >
                        <Text style={{
                            color:COLORS.white,
                            ...FONTS.h4
                        }}
                        >{selectedMovie?.details.season}</Text>
                        <Text style={{
                            marginTop:SIZES.base,
                            color:COLORS.white,
                            ...FONTS.h1
                        }}>{selectedMovie?.name}</Text>

                    </LinearGradient>
                </View>
                </View>
            </ImageBackground>
        )
    }

    function renderCategoriesAndRaiting(){
        return(
           
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                marginTop:SIZES.base
            }}>
                 <StatusBar
            backgroundColor="#000"
            barStyle="light-content"
        />
                <View style={[style.categoryContainer,{marginLeft:0}]}>
                    <Text style={{color:COLORS.white,...FONTS.h4}}>{selectedMovie?.details?.age}</Text>

                </View>
                <View style={[style.categoryContainer,{paddingHorizontal:SIZES.padding}]}>
                    <Text style={{color:COLORS.white,...FONTS.h4}}>{selectedMovie?.details?.genre}</Text>
                </View>
                <View style={style.categoryContainer}>
                    <Image source={icons.star} resizeMode="contain" style={{
                        height:15,
                        width:15
                    }}></Image>
                    <Text style={{
                        marginLeft:SIZES.base,
                        color:COLORS.white,
                        ...FONTS.h4
                    }}>{selectedMovie?.details?.ratings}</Text>
                </View>

            </View>
        )
    }
    function renderMovieDetails(){
        return(
            <View style={{
                justifyContent:"space-around",
                flex:1,
                marginTop:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}>
                <View>
                    <View style={{
                        flexDirection:"row"
                    }}>
                        <Text style={{
                            flex:1,
                            color:COLORS.white,
                            ...FONTS.h4
                        }}>{selectedMovie?.details?.currentEpisode}</Text>
                        <Text style={{
                            color:COLORS.lightGray,
                            ...FONTS.body4
                        }}>{selectedMovie?.details?.runningTime}</Text>

                    </View>
                    <ProgressBar
                    containerStyle={{
                        marginTop:SIZES.base
                    }}
                    barStyle={{
                        height:5,
                        borderRadius:3
                    }}
                    barPercentage={
                        selectedMovie?.details?.progress
                    }
                    />
                </View>
                <TouchableOpacity style={{
                    height:60,
                    borderRadius:15,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:COLORS.primary
                }}>
                    <Text
                    style={{
                        color:COLORS.white,
                        ...FONTS.h2
                    }}
                    >{selectedMovie?.details?.progress=="0%" ? "WATCH NOW" : "CONTUNIE WATCH"}</Text>

                </TouchableOpacity>

            </View>
        )
    }
    return (

        <ScrollView contentContainerStyle={{backgroundColor:COLORS.black,flex:1}}
        style={{
            backgroundColor:COLORS.black
        }}>
            {renderHeaderSection()}
            {renderCategoriesAndRaiting()}
            {renderMovieDetails()}

        </ScrollView>
        
    )
}
const style=StyleSheet.create({
    categoryContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        borderRadius:SIZES.base,
        marginLeft:SIZES.base,
        paddingHorizontal:SIZES.base,
        backgroundColor:COLORS.gray1,
        paddingVertical:3
    }
})
export default MovieDetail;