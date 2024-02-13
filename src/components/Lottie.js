import React from 'react'
import LottieView from "lottie-react-native";

export default function Lottie({animation, width, height}) {
  return (
    <LottieView
            source={animation}
            style={{ width: width, height: height }}
            autoPlay
            loop
          />
  )
}