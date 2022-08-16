import {Component} from "react";
import {Pressable, ScrollView, Text, Animated, View} from "react-native";
import {gsap} from "gsap-rn";
import {Face} from "./components/common/Face";
import {FaceGsap} from "./components/common/FaceGsap";
import {Face2} from "./components/common/Face2";

export class Main extends Component{
  state = {q:10};

  constructor(props) {
    super(props);
  }

  onPress(){
    this.setState({q:this.state.q+10});
  }

  faces(){
    let faces = [];
    for(let i = 0; i < this.state.q; i++){
      faces.push(<Face2 key={i} />);
    }
    return faces;
  }

  render(){
    return(
      <View style={{flex:1, paddingTop:40}}>
        <Pressable
          onPress={this.onPress.bind(this)}
          style={{
            padding:10,
            backgroundColor:'#ddd'
          }}
        >
          <Text>PRESS {this.state.q}</Text>
        </Pressable>
        <ScrollView
          style={{flex:1, borderWidth:1, borderColor:'#F00'}}
          contentContainerStyle={{flexDirection:"row", flexWrap:"wrap"}}
        >
          {this.faces()}
        </ScrollView>
      </View>
    )
  }
}
