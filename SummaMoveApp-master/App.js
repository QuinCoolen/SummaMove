import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screen components____________________________________________-
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OefeningenScreen from './screens/OefeningenScreen';
import PrestatieScreen from './screens/PrestatiesScreen';
import bekijkoefening from './screens/bekijkoefening';
import NavScreen from './screens/NavScreen';
import ShowScreen from './screens/Showpres';
import CreatePres from './screens/CreatePres';
import RegisterScreen from './screens/Register';
import wijzig from './screens/Wijzig';
import About from './screens/About';
const Stack = createStackNavigator();

const SummaMoveStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SummaMove" component={HomeScreen} />
        <Stack.Screen name="Navigator" component={NavScreen} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Prestaties" component={PrestatieScreen} />
        <Stack.Screen name="Oefeningen" component={OefeningenScreen} />
        <Stack.Screen name="BekijkOefening" component={bekijkoefening} />
        <Stack.Screen name="ShowScreen" component={ShowScreen}/>
        <Stack.Screen name="CreatePresscreen" component={CreatePres} />
        <Stack.Screen name="wijzigscreen" component={wijzig} />
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