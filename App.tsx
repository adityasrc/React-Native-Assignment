import { createStaticNavigation } from '@react-navigation/native';
import RootStack from 'src/navigation/root-navigator';

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation/>
  );
}


