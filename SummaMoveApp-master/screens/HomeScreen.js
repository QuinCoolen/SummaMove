import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrestatieScreen from './PrestatiesScreen';
import OefeningenScreen from './OefeningenScreen';
import bekijkoefening from './bekijkoefening';
import Showscreen from './Showpres';
import CreatePres from './CreatePres';

const Stack = createStackNavigator();

function DrawerMenu() {
    return (
      <Stack.Navigator useLegacyImplementation>
        <Stack.Screen name="Prestaties" component={PrestatieScreen} />
      <Stack.Screen name="Oefeningen" component={OefeningenScreen} />
        <Stack.Screen name="BekijkOefening" component={bekijkoefening} />
        <Stack.Screen name="Showscreen" component={Showscreen} />
        <Stack.Screen name="CreatePresscreen" component={CreatePres} />
      </Stack.Navigator>
    );
  }

const HomeScreen = () => {
    return (
        <NavigationContainer independent={true}>
          <DrawerMenu />
        </NavigationContainer>
      );
}
export default HomeScreen;