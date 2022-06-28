import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screen components____________________________________________-
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OefeningenScreen from './screens/OefeningenScreen';
import PrestatieScreen from './screens/PrestatiesScreen';
import bekijkoefening from './screens/bekijkoefening';
import Showpres from './screens/Showpres';
const Stack = createStackNavigator();

const SummaMoveStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SummaMove" component={HomeScreen} />
      <Stack.Screen name="bekijkOefening" component={bekijkoefening} />
      <Stack.Screen name="Oefeningen" component={OefeningenScreen} />
      <Stack.Screen name="Prestaties" component={PrestatieScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <SummaMoveStack />
    </NavigationContainer>
  );
}

export default App