import React, { useEffect } from 'react';

import { Animated, StyleSheet, View } from 'react-native';

export default function Loader() {
    const animations = {
        one: new Animated.Value(0),
        two: new Animated.Value(0),
        three: new Animated.Value(0),
    };

    function onAnimate(animation, nextAnimation) {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: -10,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(nextAnimation, 200);
    }

    function onStartAnimate() {
        function onThreeAnimation() {
            onAnimate(animations.three, () => {
                setTimeout(onStartAnimate, 800);
            });
        }

        function onTwoAnimation() {
            onAnimate(animations.two, onThreeAnimation);
        }

        onAnimate(animations.one, onTwoAnimation);
    }

    useEffect(() => {
        onStartAnimate();
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={[styles.ball, { transform: [{ translateY: animations.one }] }]}
                color="#1abc9c"
            />
            <View
                style={[styles.ball, { transform: [{ translateY: animations.two }] }]}
                color="#f1c40f"
            />
            <View
                style={[styles.ball, { transform: [{ translateY: animations.three }] }]}
                color="#e74c3c"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ball: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#777'
    },
})