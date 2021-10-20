import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,Image, ScrollView, FlatList,Animated, TouchableWithoutFeedback, ImageBackground,StatusBar
} from 'react-native';
import { Profile } from '../components';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants';
import {ProgressBar} from '../components';


const Home = ({ navigation }) => {
    const newSeasonScrollX = React.useRef(new Animated.Value(0)).current
    function renderHeader(){
        return(
            <View 
            style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                paddingHorizontal:SIZES.padding
            }}>
                <TouchableOpacity style={{
                    alignItems:"center",
                    justifyContent:"center",
                    height:50,
                    width:50,

                }}onPress={()=>console.log("Profile")}>
                    <Image source={images.profile_photo} style={{
                        height:40,
                        width:40,
                        borderRadius:20
                    }}/>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    height:50,
                    width:50,
                    alignItems:"center",
                    justifyContent:"center",

                }}onPress={()=>console.log("Screen Miror")}>
                    <Image source={icons.airplay} style={{
                        height:25,
                        width:25,
                        
                        tintColor:COLORS.primary
                    }}/>

                </TouchableOpacity>
            </View>
        )
    }
    function renderNewSeasonsSection(){
        return(
            <Animated.FlatList
            horizontal
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            decelerationRate={0}
            contentContainerStyle={{
                marginTop:SIZES.radius
            }}
            data={dummyData.newSeason}
            keyExtractor={item=>{`${item.id}`}}
            onScroll={Animated.event([
                {nativeEvent : {contentOffset:{x:
                newSeasonScrollX}}}
            ],{useNativeDriver:false})}
            renderItem={({item,index})=>{
                return(
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("MovieDetail",{selectedMovie:item})}>
                        <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            width:SIZES.width
                        }}>
                            <ImageBackground source={item.thumbnail}
                            resizeMode="cover"
                            style={{
                                justifyContent:"flex-end",
                                width:SIZES.width*0.85,
                                height:SIZES.height*0.45
                            }}
                            imageStyle={{borderRadius:40}}
                            >
                                <View style={{
                                    flexDirection:"row",
                                    width:"100%",
                                   
                                    height:60,
                                    paddingHorizontal:SIZES.radius,
                                    marginBottom:SIZES.radius
                                }}>
                                    <View style={{
                                        flex:1,
                                        flexDirection:"row",
                                        alignItems:"center"
                                    }}>
                                        <View style={{
                                            height:40,
                                            width:40,
                                            backgroundColor:COLORS.transparentWhite,
                                            borderRadius:20,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}>
                                            <Image source={icons.play}
                                            resizeMode="contain"
                                            style={{
                                                height:15,
                                                width:15,
                                                tintColor:COLORS.white
                                            }}
                                            />

                                        </View>
                                        <Text style={{marginLeft:SIZES.base,color:COLORS.white,...FONTS.h3}}>Play All</Text>
                                        
                                    </View>
                                    {item.stillWatching.length>0 && 
                                    <View style={{
                                        justifyContent:"center"
                                    }}>
                                        <Text style={{color:COLORS.white,...FONTS.h4}}>Still Watching</Text>
                                        <Profile
                                        profiles={item.stillWatching}/>
                                    </View>
                                    }

                                </View>
                            </ImageBackground>

                        </View>
                    </TouchableWithoutFeedback>
                )
            }}

            />
        )
    }
    function renderDots(){
        const dotPosition = Animated.divide(newSeasonScrollX,SIZES.width)
        return(
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row",
                marginTop:SIZES.padding
            }}>
                {dummyData.newSeason.map((item,index)=>{

                    const opacity= dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[0.3,1,0.3],
                        extrapolate:"clamp"
                    })

                    const dotWith = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[6,20,6],
                        extrapolate:"clamp"
                    })

                    const dotColor= dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[COLORS.lightGray,COLORS.primary,COLORS.lightGray],
                        extrapolate:"clamp"
                    })
                    return(
                        <Animated.View
                       // opacity={opacity}
                        key={`dots-${index}`}
                        opacity={opacity}
                        style={{
                            width:dotWith,
                            height:6,
                            borderRadius:SIZES.radius,
                            marginHorizontal:3,
                            backgroundColor:dotColor
                        }}
                        />
                    )
                })}
            </View>
        )
    }
    function renderContunieWatchingSection(){
        return(
            <View style={{marginTop:SIZES.padding}}>
                <View style={{
                    flexDirection:"row",
                    paddingHorizontal:SIZES.padding,
                    alignItems:"center"
                }}>
                    <Text style={{
                        color:COLORS.white,flex:1,...FONTS.h2
                    }}>Contunie Watching</Text>
                    <Image source={icons.right_arrow}
                    style={{
                        height:20,
                        width:20,
                        tintColor:COLORS.primary
                    }}
                    />

                </View>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop:SIZES.padding
                }}
                data={dummyData.continueWatching}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item,index})=>{
                    return(
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate("MovieDetail",{selectedMovie:item})}>
                            <View style={{
                                marginLeft:index == 0 ? SIZES.padding : 20,
                                marginRight:index == dummyData.continueWatching.length-1 ? SIZES.padding : 0
                            }}>
                                <Image
                                source={item.thumbnail}
                                resizeMode="cover"

                                style={{
                                    borderRadius:20,
                                    width:SIZES.width/3,
                                    height:SIZES.width/3+60

                                }}
                                />
                                <Text style={{color:COLORS.white,...FONTS.h4,marginTop:SIZES.base}}>{item.name}</Text>
                                <ProgressBar containerStyle={{
                                    marginTop:SIZES.radius
                                }}
                                barStyle={{
                                    height:3
                                }}
                                barPercentage={
                                    item.overallProgress
                                }
                                />
                            </View>

                        </TouchableWithoutFeedback>
                    )
                }}
                />

            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:COLORS.black
        }}>
             <StatusBar
            backgroundColor="#000"
            barStyle="light-content"
        />
            {renderHeader()}
            <ScrollView contentContainerStyle={{
                paddingBottom:100
            }}>
                {renderNewSeasonsSection()}
                {renderDots()}
                {renderContunieWatchingSection()}
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default Home;