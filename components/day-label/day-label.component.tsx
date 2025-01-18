import { Text, View } from 'react-native';

interface DayLabelProps {
  label: string;
}

export const DayLabel = ({ label }: DayLabelProps) => {
  return (
    <View className="flex-row items-center justify-center mt-4">
      <Text className="mr-1 font-bold text-6xl">{label}</Text>
      <View className="h-4 w-4 rounded-full" style={{ backgroundColor: '#FF4500' }} />
    </View>
  );
};
