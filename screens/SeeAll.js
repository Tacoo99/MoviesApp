import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { sizes } from "../constants";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/styles";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { image185, fallbackMoviePoster } from "../api/moviedb";

let width = sizes.width;
let height = sizes.height;

let ios = Platform.OS == "ios";

export default function SeeAll({ route }) {
  const navigation = useNavigation();
  const { screenName, data } = route.params;
  let movieList = data.data;
  let screenNameStr = JSON.stringify(screenName.title);
  let withoutQuotes = screenNameStr.replaceAll('"', "");
  let sliceFirstLetter = withoutQuotes.slice(1);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <SafeAreaView className={ios ? "-mb-2" : "mb-5"}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4 mb-5">
          <TouchableOpacity
            style={{ backgroundColor: colors.primary }}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="32" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={{ color: colors.primary }}>{withoutQuotes[0]}</Text>
            {sliceFirstLetter}
          </Text>
          <View>{/* placeholder */}</View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row justify-between flex-wrap mt-6">
            {movieList.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: image185(item.poster_path) || fallbackMoviePoster,
                      }}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}
