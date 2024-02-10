import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { sizes } from "../../constants";
import { fallbackMoviePoster, image185 } from "../../api/moviedb";

let width = sizes.width;
let height = sizes.height;

export default function MovieList({ title, data, hideSeeAll }) {
  
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SeeAll", {
                screenName: {title},
                data: {data}
              })
            }
          >
            <Text style={{ color: colors.primary }} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {/*  movie row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                  />

                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
