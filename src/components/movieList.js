import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../styles"
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants";
import { sizes } from "../../constants";

let width = sizes.width;
let height = sizes.height;

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
          <Text style={{color: colors.primary}} className="text-lg">
            See all
          </Text>
        </TouchableOpacity>
          )
        }
        
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
                onPress={() => navigation.navigate("Movie", item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={images.moviePoster2}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                  ></Image>

                  <Text className="text-neutral-300 ml-1">
                    {
                        movieName.length>14 ? movieName.slice(0,14) + '...': movieName
                    }
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
