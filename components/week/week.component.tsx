import { Text, View } from 'react-native';

interface DateLabelProps {
  week: { date: string; day: string }[];
  today: string;
}

export const Week = ({ week, today }: DateLabelProps) => {
  const isToday = (date: string) => {
    const todayParts = today.split(' ');
    const todayDay = parseInt(todayParts[1], 10);
    const formattedDate = parseInt(date, 10);
    return todayDay === formattedDate;
  };

  return (
    <View className='flex-row items-center justify-between pb-6'>
      {week.map((day, index) => {
        const isCurrentDay = isToday(day.date);
        return (
          <View
            key={index}
            className={`flex-col items-center p-2 ${
              isCurrentDay ? 'border border-gray-400 rounded-2xl px-3 py-2' : ''
            }`}
          >
            <Text
              className={`text-xl font-medium ${
                isCurrentDay ? 'text-black' : 'text-slate-500'
              }`}
            >
              {day.date}
            </Text>
            <Text
              className={`text-xs font-semibold ${
                isCurrentDay ? 'text-red-500' : 'text-slate-500'
              }`}
            >
              {day.day}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
