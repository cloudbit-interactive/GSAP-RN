import {Component} from "react";
import {Animated, Image} from "react-native";
import {gsap, Linear} from "gsap-rn";

export class Face extends Component{
  state = { ani:{rotate: `0deg`} };
  opacityAni = new Animated.Value(0);
  translateYAni = new Animated.Value(0);
  rotateAni = new Animated.Value(0);
  rotateInterpolate = this.rotateAni.interpolate({inputRange: [0, 1],outputRange: ['0deg', '360deg']});

  componentDidMount() {

    let ani = {opacity: 1};
    gsap.to(ani, {duration:2, opacity:0, repeat:-1, ease:Linear.easeNone, onUpdate:()=>{
      console.log(ani)
      this.opacityAni.setValue(ani.rotate);
    }});
    /*

    Animated.loop(
      Animated.parallel(
        [
          Animated.timing(this.opacityAni,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }
          ),
          Animated.timing(this.rotateAni,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }
          ),
          Animated.timing(this.translateYAni,
            {
              toValue: 100,
              duration: 1000,
              useNativeDriver: true,
            }
          )
        ]
      )
    ).start();

     */
  }

  render() {
    return (
      <Animated.Image
        source={require('../../media/images/happy.png')}
        style={{width: 50, height: 50, opacity:this.opacityAni, transform: [{ translateY:this.translateYAni},{rotate: this.rotateInterpolate }, {perspective: 1000}]}}
      />
    )
  }
}
