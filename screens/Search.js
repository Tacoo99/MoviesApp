import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useCallback, } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../src/components/Loading";
import debounce from "lodash.debounce";
import { searchMovies } from "../api/moviedb";
import LargeList from "../src/components/LargeList";


const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "mt-3";

export default function Search() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = search=>{
    if(search && search.length>2){
        setLoading(true);
        searchMovies({
            query: search,
            include_adult: 'true',
            language: 'en-US',
            page: '1'
        }).then(data=>{
            setLoading(false);
            if(data && data.results) setResults(data.results);
        })
    }else{
        setLoading(false);
        setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">

        {/* search input */}
        <View 
            className={"mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full "+verticalMargin }>
            <TextInput 
                onChangeText={handleTextDebounce} 
                placeholder="Search Movie" 
                placeholderTextColor={'lightgray'} 
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
            />
            <TouchableOpacity 
                onPress={()=> navigation.navigate('Home',
                )}
                className="rounded-full p-3 m-1 bg-neutral-500" 
            >
                <XMarkIcon size="25" color="white" />
                
            </TouchableOpacity>
        </View>

        {/* search results */}
            {loading? (
                <Loading />
            ): 
            results.length>0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal:15}}
                    className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                    <LargeList data={results}/>
                </ScrollView>
            ):(
                <View className="flex-row justify-center">
                    <Image 
                        source={images.movieTime} 
                        className="h-96 w-96"
                    />
                </View>
            )
        }
    </SafeAreaView>
  )
}