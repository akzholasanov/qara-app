import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewTask() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text>New task</Text>
    </SafeAreaView>
  );
}
