import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PrestatieScreen from './PrestatiesScreen';
import OefeningenScreen from './OefeningenScreen';
import bekijkoefening from './bekijkoefening';
import Showscreen from './Showpres';
import CreatePres from './CreatePres';

const Drawer = createDrawerNavigator();

function DrawerMenu() {
    return (
      <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Oefeningen" component={OefeningenScreen} />
        <Drawer.Screen name="Prestaties" component={PrestatieScreen} />
        <Drawer.Screen name="BekijkOefening" component={bekijkoefening} />
        <Drawer.Screen name="Showscreen" component={Showscreen} />
        <Drawer.Screen name="CreatePresscreen" component={CreatePres} />
      </Drawer.Navigator>
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