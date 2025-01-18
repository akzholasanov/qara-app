import Checkbox from 'expo-checkbox';
import { Text, TouchableOpacity, View } from 'react-native';

interface TaskProps {
  task: { id: number; text: string; completed: boolean; time: string };
  toggleTask: (id: number) => void;
}

export const Task = ({ task, toggleTask }: TaskProps) => {
  return (
    <TouchableOpacity
      className='w-full flex-row gap-4 items-center py-4 border-b border-gray-300 h-[60px]'
      onPress={() => toggleTask(task.id)}
    >
      <Checkbox
        value={task.completed}
        onValueChange={() => toggleTask(task.id)}
        color={task.completed ? '#000000' : undefined}
      />
      <View className='flex-1 flex-row items-center justify-between w-full'>
        <Text
          className={`ml-2 text-lg ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.text}
        </Text>
        <Text className='text-gray-500 truncate flex-shrink'>{task.time}</Text>
      </View>
    </TouchableOpacity>
  );
};
