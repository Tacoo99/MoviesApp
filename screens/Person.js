import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { images, sizes } from "../constants";
import { colors } from "../src/styles";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from '../src/components/movieList';
import Loading from "../src/components/Loading";

let width = sizes.width;
let height = sizes.height;

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-10";

export default function Person() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1,2,3,4]);
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          "flex-row justify-between items-center px-4 " + verticalMargin
        }
      >
        <TouchableOpacity
          style={{ backgroundColor: colors.primary }}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {
        loading? (
          <Loading />
        ): (
          <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={images.castImage2}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>

          <Text className="text-base text-neutral-500 text-center">
            London, United Kingdom
          </Text>
        </View>

        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1964-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">64/23</Text>
          </View>
        </View>

        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Charles Reeves is a Canadian actor. Reeves is perhaps best
            known for his roles in Bill & Teds Excellent Adventure, Speed, and
            the science fiction-action trilogy The Matrix. He has worked under
            major directors, such as Stephen Frears ; Gus Van Sant ; and
            Bernardo Bertolucci. His role as a rookie FBI agent in the 1991 surf
            drama Point Break was praised by The New York Times critic Janet
            Maslin, who stated that Reeves “.displays considerable discipline
            and range.” In addition to his film roles, Reeves has also performed
            in theatre. His performance in the title role in a Manitoba Theatre
            Centre production of Hamlet was praised by Roger Lewis, the Sunday
            Times, who called Reeves “.one of the top three Hamlets I have seen,
            for a simple reason: he is Hamlet.” On January 31, 2005, Reeves
            received a star on the Hollywood Walk of Fame. In an ET online
            survey in 2006, he was included in the “Top Ten of Americas Favorite
            Stars”.
          </Text>
        </View>

        {/* movies */}
          <MovieList title={'Movies'} data={personMovies} />
      </View>
        )
      }
      
    </ScrollView>
  );
}
