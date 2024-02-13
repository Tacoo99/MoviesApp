import React from 'react'
import LottieView from "lottie-react-native";

export default function LottieTest({animation, width, height, reference}) {
  return (
    <LottieView
            source={animation}
            reference={reference}
            style={{ width: width, height: height }}
            autoPlay={false}
            loop={false}
          />
  )
}