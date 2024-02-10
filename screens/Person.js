import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { sizes } from "../constants";
import { colors } from "../src/styles";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../src/components/movieList";
import Loading from "../src/components/Loading";
import Snackbar from "../src/components/Snackbar";
import AsyncStorageOperations from "../src/components/AsyncStorageOperations";

import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

let width = sizes.width;
let height = sizes.height;

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "mt-10";

export default function Person() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [person, setPerson] = useState([]);
  const [personID, setPersonID] = useState("");

  useEffect(() => {
    const fetchPersonID = async () => {
      try {
        const fetchedID = await item.id;
        setPersonID(fetchedID);
      } catch (error) {
        console.error("Error fetching person ID:", error);
      }
    };
    fetchPersonID();
  }, [item]);

  useEffect(() => {
    setLoading(true)
    checkPersonsStorage();
    fetchData(item.id)
  }, [item, personID]);

  useEffect(() => {
    if (snackbarVisible) {
      const timeoutId = setTimeout(() => {
        setSnackbarVisible(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [snackbarVisible, 1500]);

  const checkPersonsStorage = async () => {
    if (personID !== "") {
      const keysArray =
        (await AsyncStorageOperations.getObjectItem("persons")) || [];
      emptyKeysArray = keysArray.length === 0;
      toggleFavourite(keysArray.includes(personID));
    }
  };

  async function manageFavourites() {
    setSnackbarVisible(!snackbarVisible);

    const existingFavorites =
      (await AsyncStorageOperations.getObjectItem("persons")) || [];
    const updatedFavorites = [...existingFavorites];

    if (isFavourite) {
      toggleFavourite(false);
      setSnackbarText("Deleting from favourites");

      const indexToRemove = updatedFavorites.indexOf(personID);
      if (indexToRemove !== -1) {
        updatedFavorites.splice(indexToRemove, 1);
      }
    } else {
      toggleFavourite(true);
      setSnackbarText("Adding to favourites");

      if (!updatedFavorites.includes(personID)) {
        updatedFavorites.push(personID);
      }
    }
    AsyncStorageOperations.setObjectItem("persons", updatedFavorites);
  }

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  async function fetchData(id) {
    await getPersonDetails(id);
    await getPersonMovies(id);
    setLoading(false);
  }

  return (
    <View className="flex-1">
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
            <ChevronLeftIcon size="32" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => manageFavourites()}>
            <HeartIcon size="38" color={isFavourite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
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
                  source={{
                    uri: image342(person.profile_path) || fallbackPersonImage,
                  }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>

            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>

              <Text className="text-base text-neutral-500 text-center">
                {person?.place_of_birth}
              </Text>
            </View>

            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.gender == 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.birthday || "N/A"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.known_for_department || "N/A"}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.popularity?.toFixed(2)}%
                </Text>
              </View>
            </View>

            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                {person?.biography || "N/A"}
              </Text>
            </View>

            <MovieList title={"Movies"} data={personMovies} />
          </View>
        )}
      </ScrollView>
      <Snackbar snackbarVisible={snackbarVisible} snackbarText={snackbarText} />
    </View>
  );
}
