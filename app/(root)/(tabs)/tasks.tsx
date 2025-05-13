import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCalendar } from '@/hooks';

interface Day {
  date: string;
  dayOfMonth: string;
  dayOfWeek: string;
  monthName: string;
}

interface Task {
  id: string;
  text: string;
  time: string | null;
  day: string;
}

export default function Tasks() {
  const { currentMonth } = useCalendar();
  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  const todayIndex = currentMonth.findIndex(
    day => day.date === new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    if (todayIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: todayIndex * 60,
        animated: true,
      });
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("@tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
      } catch (e) {
        console.error("Failed to save tasks", e);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleDayPress = (day: Day) => {
    setSelectedDay(day);
    bottomSheetModalRef.current?.present();
  };

  const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const addTask = () => {
    if (value.trim() && selectedDay) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: value.trim(),
        time: selectedTime
          ? selectedTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : null,
        day: selectedDay.date,
      };
      setTasks([...tasks, newTask]);
      setValue('');
      setSelectedTime(null);
      bottomSheetModalRef.current?.close();
    }
  };

  return (
    <View className='flex-1'>
      <ScrollView
        ref={scrollViewRef}
        className='flex-1 w-full h-full mt-10 px-12 mb-6'
        contentContainerStyle={{
          paddingBottom: 85,
        }}
        showsVerticalScrollIndicator={false}
      >
        {currentMonth.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => handleDayPress(day)}>
            <View className='flex-1 flex-col gap-4 mt-10'>
              <View className='flex-row items-start justify-between'>
                <Text
                  className={`text-6xl font-bold
                ${
                  day.date === new Date().toISOString().split('T')[0]
                    ? '!text-black'
                    : 'text-gray-400'
                }
                ${
                  day.dayOfWeek === 'Saturday' || day.dayOfWeek === 'Sunday'
                    ? 'color-[#FF4500]'
                    : 'text-gray-300'
                } `}
                >
                  {day.dayOfMonth}
                </Text>
                <View className='flex-col items-end'>
                  <Text className='text-lg font-semibold text-gray-500'>
                    {day.dayOfWeek}
                  </Text>
                  <Text className='text-base font-semibold text-gray-400'>
                    {day.monthName}
                  </Text>
                </View>
              </View>
              <View>
                {tasks
                  .filter(task => task.day === day.date)
                  .map(task => (
                    <Text key={task.id} style={{ fontSize: 16, marginLeft: 20 }}>
                      {task.text} {task.time ? `- ${task.time}` : ''}
                    </Text>
                  ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        onChange={index => {
          if (index === 0) {
            bottomSheetModalRef.current?.dismiss();
            setSelectedDay(null);
          }
        }}
        onDismiss={() => setSelectedDay(null)}
        backgroundStyle={{ backgroundColor: '#fff' }}
      >
        <BottomSheetView
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingVertical: 0,
            paddingHorizontal: 20,
          }}
        >
          <View className='w-full flex-col gap-4'>
            <View className='w-full flex-row items-center justify-between'>
              <Text
                className='text-black font-medium text-lg'
                onPress={() => bottomSheetModalRef.current?.close()}
              >
                Close
              </Text>
              <Text className='text-black font-medium text-lg'>New task</Text>
              <TouchableOpacity onPress={addTask}>
                <Text className='text-black font-medium text-lg'>Add</Text>
              </TouchableOpacity>
            </View>
            {selectedDay ? (
              <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {selectedDay.dayOfWeek}, {selectedDay.dayOfMonth}{' '}
                  {selectedDay.monthName}
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 18 }}>Нет выбранного дня</Text>
            )}
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#212121',
                padding: 12,
                borderRadius: 12,
                textAlign: 'left',
              }}
              placeholder='Task'
              placeholderTextColor='#707070'
              value={value}
              onChangeText={setValue} // Исправлено
            />
            <View>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: '#e0e0e0',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>
                  {selectedTime
                    ? `Selected time: ${selectedTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}`
                    : 'Select Time'}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime || new Date()}
                  mode='time'
                  is24Hour={false}
                  display='spinner'
                  onChange={handleTimeChange}
                  textColor='#000'
                  themeVariant='dark'
                  style={{
                    width: '100%',
                  }}
                />
              )}
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
