import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/styles";
import { ChevronLeftIcon, TrashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../src/components/movieList";
import { HeartIcon } from "react-native-heroicons/solid";
import { images, sizes } from "../constants";
import AsyncStorageOperations from "../src/components/AsyncStorageOperations";
import Loading from "../src/components/Loading";

import { fetchMovieDetails } from "../api/moviedb";

let ios = Platform.OS == "ios";
let width = sizes.width;
let height = sizes.height;

export default function Favourites() {
  const navigation = useNavigation();
  const [actors, setActors] = useState([]);
  const [favouriteMoviesID, setFavouriteMoviesID] = useState([]);
  const [favouriteMoviesDetails, setFavouriteMoviesDetails] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const keysArray = await AsyncStorageOperations.getObjectItem("movie");
        setFavouriteMoviesID(keysArray || []);
        if (keysArray.length !== 0) {
          keysArray.forEach((id) => {
            getMovieDetails(id);
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };
    fetchMovies();
  }, []);

  const getMovieDetails = async (id) => {
    try {
      const data = await fetchMovieDetails(id);
      if (data) {
        setFavouriteMoviesDetails((prevMovies) => [...prevMovies, data]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "mb-2" : "mb-5"}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4 mb-4">
          <TouchableOpacity
            style={{ backgroundColor: colors.primary }}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="32" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <Text className=" text-white text-3xl font-bold">
            <Text style={{ color: colors.primary }}>F</Text>
            avourites
          </Text>
          <TouchableOpacity
            onPress={() => console.log("Delete all favourites")}
          >
            <TrashIcon color="white" size="30" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <>
            {favouriteMoviesID && favouriteMoviesID.length > 0 ? (
              <MovieList
                title="Favourite movies"
                data={favouriteMoviesDetails}
              />
            ) : (
              <View className="mt-5 mx-4 items-center">
                <View className="mb-5">
                  <Image
                    source={images.favourites_nothing}
                    style={{ width: width * 0.9, height: height * 0.3 }}
                  />
                </View>
                <Text className="text-white text-xl">Nothing here yet!</Text>
                <View className="flex-row space-x-1 items-center mt-2">
                  <Text className="text-neutral-400 text-base">
                    Add something by clicking
                  </Text>
                  <HeartIcon color="red" />
                  <Text className="text-neutral-400 text-base">icon</Text>
                </View>
              </View>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            ></ScrollView>
          </>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
}
