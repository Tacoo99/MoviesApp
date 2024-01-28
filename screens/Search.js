import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, sizes } from "../constants";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../src/components/Loading";


let width = sizes.width;
let height = sizes.height;
let movieName = "Ant-Man and the Wasp: Quantumania";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-4";

export default function Search(item) {
  const navigation = useNavigation();
  const [results, setResult] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  
  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full " +
          verticalMargin
        }
      >
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* results */}

      {
        loading? (
            <Loading />
        ): (
            results.length > 0 ? (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 15 }}
                  className="space-y-3"
                >
                  <Text className="text-white font-semibold ml-1">
                    Results ({results.length})
                  </Text>
                  <View className="flex-row justify-between flex-wrap">
                    {results.map(
                      (item,
                      (index) => {
                        return (
                          <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push("Movie", item)}
                          >
                            <View className="space-y-2 mb-4">
                              <Image
                                className="rounded-3xl"
                                source={images.moviePoster2}
                                style={{ width: width * 0.44, height: height * 0.3 }}
                              ></Image>
                              <Text className="text-neutral-400 ml-1">
                                {movieName.length > 22
                                  ? movieName.slice(0, 22) + "..."
                                  : movieName}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })
                    )}
                  </View>
                </ScrollView>
              ) : (
                <View className="flex-row justify-center">
                    <Image source={images.movieTime}
                    className="h-96 w-96" />
                </View>
              )
        )
      }

      
    </SafeAreaView>
  );
}
