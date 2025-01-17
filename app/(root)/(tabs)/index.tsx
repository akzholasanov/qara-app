import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text className='text-3xl font-bold my-4'>QarapKyl</Text>
      <Link href='/calendar'>Calendar</Link>
      <Link href='/new-task'>New task</Link>
    </SafeAreaView>
  );
}
