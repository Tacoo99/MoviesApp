import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import { fallbackMoviePoster, image185 } from "../../api/moviedb";
import { sizes } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function LargeList({ data, title }) {
  const navigation = useNavigation();
  let width = sizes.width;
  let height = sizes.height;
  return (
    <View>
      {title && (
        <Text className="text-white text-xl">{title}</Text>
      )}
      <View className="flex-row justify-between flex-wrap mt-4 ">
        {data.map((item, index) => {
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
                <Text className="text-gray-300 ml-1 text-center">
                  {item.title.length > 22
                    ? item.title.slice(0, 22) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}
