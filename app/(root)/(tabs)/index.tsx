import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useCalendar } from '@/hooks';
import { Task, DayLabel, DateLabel, Week } from '@/components';


export default function Index() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false, time: '10:00' },
    { id: 2, text: 'Task 2', completed: false, time: '11:00' },
    { id: 3, text: 'Task 3', completed: false, time: '12:00' },
    { id: 4, text: 'Task 4', completed: false,  time: '1:00' },
    { id: 5, text: 'Task 5', completed: false, time: '2:00' },
    { id: 6, text: 'Task 6', completed: false, time: '3:00' },
    { id: 7, text: 'Task 7', completed: false, time: '4:00' },
    { id: 8, text: 'Task 8', completed: false, time: '5:00' },
    { id: 9, text: 'Task 9', completed: false, time: '6:00' },
    { id: 10, text: 'Task 10', completed: false, time: '7:00' },
    { id: 11, text: 'Task 11', completed: false, time: '8:00' },
  ]);
  const { shortDayName, fullDate, year, currentWeek } = useCalendar();

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <View className='mt-10 flex-1 w-full h-full items-center justify-between p-6'>
      <View className='w-full flex flex-col gap-6'>
        <View className='w-full h-[80px] flex-row items-center justify-between'>
          <DayLabel label={shortDayName} />
          <DateLabel date={fullDate} year={year} />
        </View>
        <Week week={currentWeek} today={fullDate} />
      </View>
      <View className='h-px bg-gray-300 w-full border-b border-dashed' />
      <ScrollView
        className='flex-1 w-full h-[calc(100%-100px)] pb-20'
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: tasks.length === 0 ? 'center' : undefined,
          alignItems: tasks.length === 0 ? 'center' : undefined,
          paddingBottom: 85,
        }}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length > 0 &&
          tasks.map(task => (
            <Task task={task} key={task.id} toggleTask={toggleTask} />
          ))}
        {tasks.length === 0 && (
          <Text className='text-xl font-semibold text-gray-400'>No tasks</Text>
        )}
      </ScrollView>
    </View>
  );
}
