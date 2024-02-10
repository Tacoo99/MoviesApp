import React from 'react'
import SnackBar from "react-native-snackbar-component";

export default function Snackbar({snackbarVisible, snackbarText}) {
  return (
    <SnackBar
        visible={snackbarVisible}
        position="bottom"
        containerStyle={{
          borderRadius: 10,
          marginHorizontal: 8,
        }}
        textMessage={snackbarText}
        autoHidingTime={1500}
      />
  )
}