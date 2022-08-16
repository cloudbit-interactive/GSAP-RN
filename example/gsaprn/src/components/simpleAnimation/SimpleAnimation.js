import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AutoKillTweens, Elastic, gsap} from 'gsap-rn';

export const SimpleAnimation = () => {
  const boxRef = React.createRef();
  const tweens = {};

  const animate = () => {
    AutoKillTweens.kill(tweens);
    tweens.ani1 = gsap.timeline();
    tweens.ani1.set(boxRef.current, {style: {width: '10%'}});
    tweens.ani1.to(boxRef.current, {
      duration: 1,
      style: {width: '80%'},
      ease: Elastic.easeInOut,
    });
    tweens.ani1.set(boxRef.current, {style: {width: 'auto'}});
  };

  return (
    <>
      <AutoKillTweens tweens={tweens} />
      <View ref={boxRef} style={[style.box]} />
      <Pressable onPress={animate} style={[style.button, {marginTop: 20}]}>
        <Text>Click</Text>
      </Pressable>
    </>
  );
};

export const style = StyleSheet.create({
  box: {
    padding: 20,
    width: '50%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#dddddd',
  },
});
