import { View, Text } from 'react-native'
import React from 'react'
import { sizes } from '../../constants'
import * as Progress from 'react-native-progress'
import { colors } from '../styles'

let width = sizes.width
let height = sizes.height

export default function Loading() {
  return (
    <View style={{height, width}} className="absolute flex-row justify-center items-center">
      <Progress.CircleSnail thickness={12} size={160} color={colors.primary} />
    </View>
  )
}