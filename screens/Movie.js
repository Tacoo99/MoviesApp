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
import { sizes } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../src/components/cast";
import MovieList from "../src/components/movieList";
import Loading from "../src/components/Loading";
import SnackBar from "react-native-snackbar-component";

import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import AsyncStorageOperations from "../src/components/AsyncStorageOperations";

let width = sizes.width;
let height = sizes.height;

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function Movie() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [movieID, setMovieID] = useState("");

  let emptyKeysArray = false;

  useEffect(() => {
    const fetchMovieID = async () => {
      try {
        const fetchedID = await item.id;
        setMovieID(fetchedID);
      } catch (error) {
        console.error("Error fetching movie ID:", error);
      }
    };
    fetchMovieID();
  }, [item]);

  useEffect(() => {
    setLoading(true);
    checkMoviesStorage();
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item, movieID]);

  useEffect(() => {
    if (snackbarVisible) {
      const timeoutId = setTimeout(() => {
        setSnackbarVisible(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [snackbarVisible, 1500]);

  const checkMoviesStorage = async () => {
    if (movieID !== "") {
      const keysArray =
        (await AsyncStorageOperations.getObjectItem("movie")) || [];
      emptyKeysArray = keysArray.length === 0;
      toggleFavourite(keysArray.includes(movieID));
      console.log(
        emptyKeysArray ? "KeysArray is empty" : "KeysArray is not empty"
      );
    }
  };

  async function manageFavourites() {
    setSnackbarVisible(!snackbarVisible);

    const existingFavorites =
      (await AsyncStorageOperations.getObjectItem("movie")) || [];
    const updatedFavorites = [...existingFavorites];

    if (isFavourite) {
      toggleFavourite(false);
      console.log("Deleting from favourites");
      setSnackbarText("Deleting from favourites");

      const indexToRemove = updatedFavorites.indexOf(movieID);
      if (indexToRemove !== -1) {
        updatedFavorites.splice(indexToRemove, 1);
      }
    } else {
      toggleFavourite(true);
      console.log("Adding to favourites");
      setSnackbarText("Adding to favourites");

      if (!updatedFavorites.includes(movieID)) {
        updatedFavorites.push(movieID);
      }
    }

    AsyncStorageOperations.setObjectItem("movie", updatedFavorites);
  }

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  return (
    <View className="flex-1">
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
            <TouchableOpacity onPress={() => manageFavourites()}>
              <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>

          {loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={{
                  uri: image500(movie?.poster_path) || fallbackMoviePoster,
                }}
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
            {movie?.title}
          </Text>

          {/* status, release, runtime */}

          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} · {movie?.release_date?.split("-")[0]} ·{" "}
              {movie?.runtime} min
            </Text>
          ) : null}

          {/* genres */}

          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre?.name} {showDot ? "·" : null}
                </Text>
              );
            })}
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>

        {/* cast */}
        <Cast navigation={navigation} cast={cast} />

        {/* similar movies */}
        <MovieList
          title="Similar movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      </ScrollView>
      <SnackBar
        visible={snackbarVisible}
        position="bottom"
        containerStyle={{
          borderRadius: 10,
          marginHorizontal: 8,
        }}
        textMessage={snackbarText}
        actionHandler={() => setSnackbarVisible(!snackbarVisible)}
        actionText="Dismiss"
        autoHidingTime={1500}
        onDismiss={() => {
          setSnackbarVisible(!snackbarVisible);
        }}
      />
    </View>
  );
}
