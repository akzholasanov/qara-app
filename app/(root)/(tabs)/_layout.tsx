import { Tabs } from 'expo-router';
import { Dimensions, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 45,
          left: 24,
          marginHorizontal: (screenWidth - 200) / 2,
          width: 200,
          height: 60,
          elevation: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 40,
          borderTopWidth: 0,

          // shadow iOS
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name='home'
                size={24}
                color={focused ? '#141414' : '#A0AEC0'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='new-task'
        options={{
          title: 'New Task',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome6
                name='plus'
                size={26}
                color={focused ? '#141414' : '#A0AEC0'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name='calendar'
                size={24}
                color={focused ? '#141414' : '#A0AEC0'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
