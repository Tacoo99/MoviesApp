import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { HeartIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { colors } from "../src/styles";
import TrendingMovies from "../src/components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../src/components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../src/components/Loading";
import { addEventListener } from "@react-native-community/netinfo";
import { WifiIcon } from "react-native-heroicons/outline";
import Lottie from "../src/components/Lottie";
import animations from "../constants/animations";

import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setConnectionStatus(state.isInternetReachable);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (connectionStatus) {
        await getTrendingMovies();
        await getUpcomingMovies();
        await getTopRatedMovies();
      }
    };

    fetchData();
  }, [connectionStatus]);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className="mb-4">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
            <HeartIcon size="32" strokeWidth={2} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold">
            <Text style={{ color: colors.primary }}>M</Text>
            ovies
          </Text>
          <TouchableOpacity
            onPress={() =>
              connectionStatus ? navigation.navigate("Search") : null
            }
          >
            <MagnifyingGlassIcon size="32" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {connectionStatus ? (
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Trending movies */}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* upcoming movies row */}
            {upcoming.length > 0 && (
              <MovieList title="Upcoming" data={upcoming} />
            )}

            {/* top rated movies row */}
            {topRated.length > 0 && (
              <MovieList title="Top Rated" data={topRated} />
            )}
          </ScrollView>
        )
      ) : (
        <View className="flex-1 items-center">
          <Lottie
            animation={animations.noInternet}
            width={"80%"}
            height={"50%"}
          />
          <View className="flex-row space-x-1 items-center mt-2">
            <Text className="text-neutral-400 text-base">
              Please check your internet connection
            </Text>
            <WifiIcon size={26} color={colors.primary} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
