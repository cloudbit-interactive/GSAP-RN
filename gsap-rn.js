/* TweenMaxRN
    INSTRUCTIONS
    > npm install gsap gsap-rn

    Example:
        import {gsap, Back, AutoKillTweens} from 'gsap-rn';

        this.tween = gsap.to(this.box, {duration:1, style:{left:50}, transform:{rotate:90, scale:0.5}, ease:Back.easeInOut});
        <View ref={box => this.box = box} style={{width:100, height:100, backgroundColor:"#F00"}}></View>

        // Kill Tween animations before componentWillUnmount to avoid error trying update unmounted component, this 2 ways receive a single or an array of Tweens, Tweenline or a mix of both.
            componentWillUnmount(){ AutoKillTweens.tweensOf(this.tween); }
            <AutoKillTweens tweens={[this.tween1, this.tween2]} />
*/
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import { gsap, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, TweenLite, TweenMax, TimelineLite, TimelineMax } from 'gsap/src/gsap-core';

LogBox.ignoreLogs(['Invalid property', 'GSAP target']);

export class AutoKillTweens extends Component{
    constructor(props) {
        super(props);
    }

    static kill(tweens){
        if(!tweens) return;
        if(!Array.isArray(tweens)) tweens = [tweens];
        for(let i = 0; i < tweens.length; i++){
            let tween = tweens[i];
            if(!tween) continue;
            if(tween.kill) tween.kill();
        }
    }

    static tweensOf(tweens){
        if(!tweens) return;
        if(typeof tweens == "object" && tweens.kill){ AutoKillTweens.kill(tweens); return; }
        if(Array.isArray(tweens)){ AutoKillTweens.kill(tweens); return; }
        let keys = Object.keys(tweens);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            if(tweens[key] && typeof tweens[key] == "object" && tweens[key].kill){
                AutoKillTweens.kill(tweens[key]);
            }
        };
    }

    componentWillUnmount() {
        AutoKillTweens.tweensOf(this.props.tweens);
    }

    render() { return null }
}

AutoKillTweens.defaultProps = { tweens:null }


gsap.registerPlugin(
    {
        name: "style",
        version: '0.0.1',
        init: function init(target, values) {
            if(!target) return;
            this.target = target;
            this.interpolateList = {};
            if(!target["currentStatus"]) target["currentStatus"] = {}
            for (let prop in values) {
                let value = values[prop];
                let startValue = target["currentStatus"][prop] || 0;
                if(prop == "backgroundColor") startValue = target["currentStatus"][prop] || "#000000";
                if(prop == "color") startValue = target["currentStatus"][prop] || "#000000";
                if(String(value).indexOf("%") != -1 && String(startValue).indexOf("%") == -1){ startValue = startValue+"%"; }
                if(String(startValue).indexOf("%") != -1 && String(value).indexOf("%") == -1){ startValue = startValue.replace("%",""); }
                this.interpolateList[prop] = gsap.utils.interpolate(startValue, value);
            }
        },
        render: function render(progress, data) {
            if(!data.target || !data.target.setNativeProps) return;
            for (let prop in data.interpolateList) {
                let value = data.interpolateList[prop](progress);
                if(typeof value == "object"){
                    let objValue = "";
                        Object.values(value).map(value=>{ objValue += value; });
                    value = objValue;
                }
                let realProp = prop;
                if(realProp == "alpha") realProp = "opacity";
                if(realProp == "position" && value === 0) continue;
                if(realProp == "alignItems" && value === 0) continue;
                if(realProp == "justifyContent" && value === 0) continue;
                data.target.setNativeProps({style:{[realProp]:value}  } );
                data.target.currentStatus[prop] = value;
            }
        },
    }
);

gsap.registerPlugin(
    {
        name: "transform",
        version: '0.0.1',
        init: function init(target, values) {
            if(!target) return;
            this.target = target;
            this.interpolateList = {};
            if(!target["currentStatus"]) target["currentStatus"] = {}
            for (let prop in values) {
                let value = values[prop];
                let startValue;
                if(prop == "scale" || prop == "scaleX" || prop == "scaleY" ){
                    startValue = target["currentStatus"][prop] || 1;
                }else{
                    startValue = target["currentStatus"][prop] || 0;
                }
                this.interpolateList[prop] = gsap.utils.interpolate(startValue, value);
            }
        },
        render: function render(progress, data) {
            if(!data.target || !data.target.setNativeProps) return;
            let transformMap = data.target["transformMap"] || {};
            for (let prop in data.interpolateList) {
                let value = data.interpolateList[prop](progress);
                let realProp = prop;
                if(realProp == "x") realProp = "translateX";
                if(realProp == "y") realProp = "translateY";
                transformMap[realProp] = value;
                data.target.currentStatus[prop] = value;
            }

            data.target["transformMap"] = transformMap;
            let transformArray = [];
            Object.keys(transformMap).map(key=>{
                let value = transformMap[key];
                if(key == "rotate" || key == "rotateX" || key == "rotateY" || key == "rotateZ" || key == "skewX" || key == "skewY" ){
                    value = value+"deg";
                }
                let obj = {};
                    obj[key] = value;
                transformArray.push(obj);
            });
            data.target.setNativeProps({style:{transform:transformArray}});
        },
    }
);

export { gsap, TweenMax, TweenLite, TimelineMax, TimelineLite, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ };
