import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../../api/moviedb";

export default function Persons({ persons, navigation, title }) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {persons.map((person, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="mr-4 item-center"
              onPress={() => navigation.navigate("Person", person)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center">
                <Image
                  className="rounded-3xl h-24 w-20"
                  source={{
                    uri: image185(person?.profile_path) || fallbackPersonImage,
                  }}
                />
              </View>
              <Text className="text-white text-xs mt-1">
                {person?.name?.length > 10
                  ? person?.name.slice(0, 10) + "..."
                  : person?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
