import {Component} from "react";
import {Animated, Image} from "react-native";
import {gsap, Linear} from "gsap-rn";

export class FaceGsap extends Component{
  state = { opacity:1 };
  opacity = 1;

  componentDidMount() {
    /*
    let ani = {opacity:1};
    gsap.to(ani, {duration:1, opacity:0, repeat:-1, onUpdate:(data)=>{
      this.setState({opacity:ani.opacity});
    }});
     */
  }


  render() {
    return (
      <Image
        source={require('../../media/images/happy.png')}
        style={{width: 50, height: 50, opacity:this.state.opacity, }}
        accessibilty={false}
      />
    )
  }
}
