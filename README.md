# GSAPRN

Support for gsap: 3.0.0+. For older versions use [https://github.com/tufik2/TweenMaxRN](https://github.com/tufik2/TweenMaxRN)
- This repository enable GSAP to work with ReactNative thanks to Direct Manipulation.
- With this library is possible animate Styles and Transform properties.
- Currently in RN there is not way to recover the current status of a style appied to an element, so is always important specify the initial params with **gsap.set()** before animate its.
- The performance using Direct Manipulation is really good, specially when we compile our app in release version.

# How use

- Include src/libs/TweenMaxRN.js in your project library folder
- Install gsap and gsaprn
	> npm install gsap
	> npm install gsaprn

```javascript
import {gsap, Back} from 'gsaprn';

componentDidMount() {  
    gsap.to(this.ref, {duration:1, style:{left:50}, transform:{rotate:90, scale:0.5}, ease:Back.easeInOut});  
}

// render view
<View ref={ref=> this.ref = ref} style={{width:100, height:100, backgroundColor:"#F00"}}></View>
```

# AutoKillTween
If the app need unmount a component and It is executing an animation ReactNative will throw an updating in an unmontain component error. To offert a easy solution to It you can use AutoKillTween to force stop all animation before unmount.

```javascript
// This method receive a tween or an array of tweens
AutoKillTween.Targets(tween)

// This method will try to kill all tweens linked to the Class or the Object, receive a Class that contain tweens linked to It or an Object that could containt tweens linked to It.
AutoKillTween.Root({tween1..., tween2...});

// Also is possible define It like component and It will stop all animation automatically before unmount the component.
<View>
	// AutoKillTween will checkout if there are tweens linked to the class and stop its.
	<AutoKillTween root={this} />  
</View>
```

Here a code using AutoKillTween

```javascript

import React, {Component} from 'react';  
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';  
import {gsap, Power2, Elastic, AutoKillTween} from 'gsaprn';  
  
export default class Main extends Component {  
    static defaultProps = { }  
    boxes = [];  
  
	constructor(props){  
	      super(props);  
	}  
  
    onPress(){  
	    // Using AutoKillTween.Targets method to kill a specific tween
        AutoKillTween.Targets(this.tl);	
        // We mantain the reference of the tween directly in the Class,
        this.tl = gsap.timeline();  
		this.tl.to(this.boxes, {duration:1, transform:{y:-100, scale:0.8}, ease:Power2.easeInOut, stagger: {amount: 0.3}});  
		this.tl.to(this.boxes, {duration:0.3, transform:{y:0, scale:1 }, ease:Elastic.easeOut, stagger: {amount: 0.3}});  
	}  
  
    render() {  
        return (  
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>  
				 /* We pass the Class reference to AutoKillTween Componet. 
					If a component will unmont, AutoKillTween will end all animations directy linked to the Class.
				 */
				 <AutoKillTween root={this} />  
				 <View style={{flexDirection:"row"}}>  
					 <View ref={ ref=>this.boxes.push(ref) } style={styles.box} />  
					 <View ref={ ref=>this.boxes.push(ref) } style={styles.box} />  
					 <View ref={ ref=>this.boxes.push(ref) } style={styles.box} />  
				 </View>
				 <TouchableOpacity onPress={this.onPress.bind(this)}>  
					 <Text ref={ref=>this.text = ref} style={[styles.button, {marginTop: 30}]} >Touch Me</Text>  
				 </TouchableOpacity>
			</View>  );  
  }  
}  
  
const styles = StyleSheet.create({  
    box:{width:75, height:75, backgroundColor: "#f0ad4e", marginHorizontal:5},  					
	button:{fontSize:20, backgroundColor: "#337ab7", paddingVertical:10, paddingHorizontal:20, color:"#FFF", borderRadius:5}  
})
```

# DEMO
![animation](http://int-server-one.info/cloudbit/tweenmaxRN.gif)
