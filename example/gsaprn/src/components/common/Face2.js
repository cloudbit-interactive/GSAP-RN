import {Component} from "react";
import {Animated, Easing, Image, UIManager} from "react-native";
import {gsap, Linear} from "gsap-rn";

export class Face2 extends Component{
  state = { ani:{rotate: `0deg`} };
  marginTopAni = new Animated.Value(0);
  opacityAni = new Animated.Value(1);
  translateYAni = new Animated.Value(0);
  rotateAni = new Animated.Value(0);
  rotateInterpolate = this.rotateAni.interpolate({inputRange: [0, 1],outputRange: ['0deg', '360deg']});

  componentDidMount() {

    let ani = {opacity: 1};
    //gsap.to(ani, {duration:1, opacity:0, repeat:-1, ease:Linear.easeNone, onUpdate:()=>{
      //this.opacityAni.setValue(ani.opacity);
    //}});

    Animated.loop(
      Animated.timing(this.translateYAni,
        {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.out(Easing.elastic(0.2))
        }
      )
    ).start();

  }

  render() {
    return (
      <Animated.Image
        source={require('../../media/images/happy.png')}
        style={{width: 50, height: 50, borderWidth:1, borderColor:"#F00", opacity:this.opacityAni, transform: [{ translateY:this.translateYAni}, {rotate: this.rotateInterpolate }, {perspective: 1000}]}}
      />
    )
  }
}
