import {Text, View} from 'react-native';
import {SimpleAnimation} from './components/simpleAnimation/SimpleAnimation';

export const Main = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SimpleAnimation />
    </View>
  );
};
