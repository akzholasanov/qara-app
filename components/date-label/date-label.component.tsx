import { Text, View } from 'react-native';

interface DateLabelProps {
  date: string;
  year: number;
}

export const DateLabel = ({ date, year }: DateLabelProps) => {
  return (
    <View className='items-end'>
      <Text className='text-2xl font-medium text-slate-500'>{date}</Text>
      <Text className='text-xl font-medium text-slate-500'>{year}</Text>
    </View>
  );
};
