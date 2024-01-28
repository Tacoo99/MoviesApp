import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { colors } from "../src/styles";
import { images, sizes } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../src/components/cast";
import MovieList from "../src/components/movieList";
import Loading from "../src/components/Loading";

let width = sizes.width;
let height = sizes.height;

let movieName = "Ant-Man and the Wasp: Quantumania";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function Movie() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    // call the movie details API
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            style={{ backgroundColor: colors.primary }}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="32" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? colors.primary : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={images.moviePoster2}
              style={{ width, height: height * 0.55 }}
            ></Image>

            <LinearGradient
              colors={[
                "transparent",
                "rgba(23,23,23,0.8)",
                "rgba(23,23,23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-tighter">
          {movieName}
        </Text>

        {/* status, release, runtime */}

        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released · 2020 · 170 min
        </Text>

        {/* genres */}

        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along
          with Hope's parents and Scott's daughter Cassie. Together they must
          find a way to escape, but what secrets is Hope's mother hiding? And
          who is the mysterious Kang?
        </Text>
      </View>

      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title="Similar movies"
        hideSeeAll={true}
        data={similarMovies}
      ></MovieList>
    </ScrollView>
  );
}
