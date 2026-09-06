import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';

interface SwipeToConfirmProps {
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
}

export const SwipeToConfirmButton: React.FC<SwipeToConfirmProps> = ({
  onConfirm,
  label = 'Swipe to Confirm & Resolve Issue',
  confirmedLabel = 'Ground Verified & Resolved!',
  disabled = false,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [trackWidth, setTrackWidth] = useState(300);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleLayout = (e: any) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const maxSwipe = Math.max(trackWidth - 54, 150);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isConfirmed && !disabled,
      onMoveShouldSetPanResponder: () => !isConfirmed && !disabled,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= maxSwipe) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= maxSwipe * 0.75) {
          // Snap to end & trigger confirm
          Animated.timing(translateX, {
            toValue: maxSwipe,
            duration: 180,
            useNativeDriver: false,
          }).start(() => {
            setIsConfirmed(true);
            onConfirm();
          });
        } else {
          // Reset
          Animated.spring(translateX, {
            toValue: 0,
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.container,
        isConfirmed && styles.containerConfirmed,
        disabled && styles.containerDisabled,
      ]}
      onLayout={handleLayout}
    >
      {/* Background track text */}
      <Text style={[styles.trackText, isConfirmed && styles.trackTextConfirmed]}>
        {isConfirmed ? confirmedLabel : label}
      </Text>

      {/* Swipeable Thumb */}
      {!isConfirmed && (
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX }] },
          ]}
          {...panResponder.panHandlers}
        >
          <Ionicons name="arrow-forward" size={20} color={VeerColors.white} />
        </Animated.View>
      )}

      {isConfirmed && (
        <View style={styles.confirmedIconBox}>
          <Ionicons name="checkmark-circle" size={24} color={VeerColors.white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: VeerColors.saffronSoft,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: VeerColors.saffronBorder,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  containerConfirmed: {
    backgroundColor: VeerColors.success,
    borderColor: VeerColors.successBorder,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  trackText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.saffronDark,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  trackTextConfirmed: {
    color: VeerColors.white,
  },
  thumb: {
    position: 'absolute',
    left: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: VeerColors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  confirmedIconBox: {
    position: 'absolute',
    right: 14,
  },
});
