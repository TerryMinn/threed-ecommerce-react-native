import React, { useEffect } from "react";
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Model,
  useCameraManipulator,
} from "react-native-filament";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { AntDesign } from "@expo/vector-icons";
import {
  Easing,
  withTiming,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";

const getModelSource = (id: string) => {
  switch (id) {
    case "1":
      return require("../../../assets/model/1.glb");
    case "2":
      return require("../../../assets/model/2.glb");
    case "3":
      return require("../../../assets/model/3.glb");
    case "4":
      return require("../../../assets/model/4.glb");
    case "5":
      return require("../../../assets/model/5.glb");
    case "6":
      return require("../../../assets/model/6.glb");
    case "7":
      return require("../../../assets/model/7.glb");
    case "8":
      return require("../../../assets/model/8.glb");
    case "9":
      return require("../../../assets/model/9.glb");
    case "10":
      return require("../../../assets/model/10.glb");
    case "11":
      return require("../../../assets/model/11.glb");
    case "12":
      return require("../../../assets/model/12.glb");
    case "13":
      return require("../../../assets/model/13.glb");
    case "14":
      return require("../../../assets/model/14.glb");
    case "15":
      return require("../../../assets/model/15.glb");
    case "16":
      return require("../../../assets/model/16.glb");
    case "17":
      return require("../../../assets/model/17.glb");
    case "18":
      return require("../../../assets/model/18.glb");
    case "19":
      return require("../../../assets/model/19.glb");
    case "20":
      return require("../../../assets/model/20.glb");
    default:
      return require("../../../assets/model/1.glb");
  }
};

function Scene() {
  const rotation = useSharedValue(180);

  useEffect(() => {
    rotation.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const { id } = useLocalSearchParams();
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  });

  const viewHeight = Dimensions.get("window").height;
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      const yCorrected = viewHeight - event.translationY;
      cameraManipulator?.grabBegin(event.translationX, yCorrected, false);
    })
    .onUpdate((event) => {
      const yCorrected = viewHeight - event.translationY;
      cameraManipulator?.grabUpdate(event.translationX, yCorrected);
    })
    .maxPointers(1)
    .onEnd(() => {
      cameraManipulator?.grabEnd();
    });

  const previousScale = useSharedValue(1);
  const scaleMultiplier = 100;
  const pinchGesture = Gesture.Pinch()
    .onBegin(({ scale }) => {
      previousScale.value = scale;
    })
    .onUpdate(({ scale, focalX, focalY }) => {
      const delta = scale - previousScale.value;
      cameraManipulator?.scroll(focalX, focalY, -delta * scaleMultiplier);
      previousScale.value = scale;
    });
  const combinedGesture = Gesture.Race(pinchGesture, panGesture);

  // Use useDerivedValue to observe changes in rotation.value
  useDerivedValue(() => {
    console.log(rotation.value, "hello animation");
  });

  // Apply rotation to the model
  const modelRotation = useDerivedValue(() => {
    return [0, rotation.value, 0]; // Rotate around the Y-axis
  });

  return (
    <GestureDetector gesture={combinedGesture}>
      <FilamentView style={styles.container}>
        <Camera cameraManipulator={cameraManipulator} />
        <DefaultLight />

        <Model
          source={getModelSource(id as string)}
          transformToUnitCube
          rotation={modelRotation.value} // Apply rotation here
        />
      </FilamentView>
    </GestureDetector>
  );
}

function CameraPan() {
  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "3D view",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <FilamentScene>
          <Scene />
        </FilamentScene>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraPan;
