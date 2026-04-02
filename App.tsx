import { createStaticNavigation } from '@react-navigation/native';
import AuthStack from 'src/navigation/auth-navigator';

const Navigation = createStaticNavigation(AuthStack);

export default function App() {
  return (
    <Navigation/>
  );
}


