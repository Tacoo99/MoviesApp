import { View, Text, Platform, TouchableOpacity, Image } from "react-native";
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
import { fetchMovieDetails, fetchPersonDetails } from "../api/moviedb";
import Snackbar from "../src/components/Snackbar";
import Persons from "../src/components/Persons";

let ios = Platform.OS == "ios";
let width = sizes.width;
let height = sizes.height;

export default function Favourites() {
  const navigation = useNavigation();
  const [favouritePersonsID, setFavouritePersonsID] = useState([]);
  const [favouritePersonsDetails, setFavouritePersonsDetails] = useState();
  const [favouriteMoviesID, setFavouriteMoviesID] = useState([]);
  const [favouriteMoviesDetails, setFavouriteMoviesDetails] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [loading, setLoading] = useState(true);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [personsLoaded, setPersonsLoaded] = useState(false);


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const keysArray2 =
          (await AsyncStorageOperations.getObjectItem("persons")) || [];
        setFavouritePersonsID(keysArray2);
        if (keysArray2.length > 0) {
          await keysArray2.forEach(getPersonDetails);
        }
      } catch (error) {
        console.error("Error fetching persons: ", error);
      } finally {
        setPersonsLoaded(true);
      }
    };

    const fetchMovies = async () => {
      try {
        const keysArray =
          (await AsyncStorageOperations.getObjectItem("movies")) || [];
        setFavouriteMoviesID(keysArray);

        if (keysArray.length > 0) {
          keysArray.forEach(getMovieDetails);
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
      } finally {
        setMoviesLoaded(true);
      }
    };
    fetchMovies();
    fetchPersons();
  }, []);

  useEffect(() => {
    if (moviesLoaded && personsLoaded) {
      setLoading(false);
    }
  }, [moviesLoaded, personsLoaded]);

  useEffect(() => {
    if (snackbarVisible) {
      const timeoutId = setTimeout(() => {
        setSnackbarVisible(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [snackbarVisible, 1500]);

  const getMovieDetails = async (id) => {
    try {
      const movieData = await fetchMovieDetails(id);
      if (movieData) {
        setFavouriteMoviesDetails((prevMovies) => [...prevMovies, movieData]);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const getPersonDetails = async (id) => {
    try {
      const personData = await fetchPersonDetails(id);
      if (personData !== null) {
        setFavouritePersonsDetails((prevPersons = []) => [...prevPersons, personData]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching persons details:", error);
    }
  };

  const deleteAllFavourites = async () => {
    setSnackbarVisible(!snackbarVisible);
    let emptyArray = [];
    if (favouriteMoviesDetails.length > 0 || favouritePersonsDetails.length > 0) {
      await AsyncStorageOperations.setObjectItem("movies", emptyArray);
      await AsyncStorageOperations.setObjectItem("persons", emptyArray);
      setSnackbarText("All keys cleared");
    } else {
      setSnackbarText("Nothing to delete");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "mb-2" : "mb-5"}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4 mb-5">
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
          <TouchableOpacity onPress={() => deleteAllFavourites()}>
            <TrashIcon color="white" size="30" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <>
            {favouriteMoviesID && favouriteMoviesID.length > 0 ? (
              <MovieList
                data={favouriteMoviesDetails}
                title="Movies"
                hideSeeAll={true}
              />
            ) : (
              <View className="mt-5 mx-4 items-center">
                <View className="mb-1">
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
            
            {favouritePersonsDetails != null && favouritePersonsDetails.length > 0 && 
              <Persons navigation={navigation} title="Persons" persons={favouritePersonsDetails} /> }
          </>
        )}
      </SafeAreaView>
      <Snackbar snackbarVisible={snackbarVisible} snackbarText={snackbarText} />
    </SafeAreaView>
  );
}
