import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useCalendar } from '@/hooks';

interface Day {
  date: string;
  dayOfMonth: string;
  dayOfWeek: string;
  monthName: string;
}

export default function Tasks() {
  const { currentMonth } = useCalendar();
  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  const handleDayPress = (day: Day) => {
    setSelectedDay(day);
    bottomSheetRef.current?.present();
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
          <TouchableOpacity
            key={index}
            onPress={() => handleDayPress(day)} // Обрабатываем клик
          >
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
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        onChange={() => setSelectedDay(null)}
        index={0}
        snapPoints={['50%', '90%']}
        backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        containerStyle={{ height: '100%', backgroundColor: 'transparent' }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text onPress={() => bottomSheetRef.current?.close()} className='text-black' >Close</Text>
          {selectedDay ? (
            <View>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {selectedDay.dayOfWeek}, {selectedDay.dayOfMonth}{' '}
                {selectedDay.monthName}
              </Text>
              <Text style={{ fontSize: 18, marginTop: 10 }}>
                Выбранный день
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 18 }}>Нет выбранного дня</Text>
          )}
        </View>
      </BottomSheetModal>
    </View>
  );
}
