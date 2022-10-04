type RouteList = {
  Pokemon: {
    itemKey: number;
  };
};

type RouteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<StackParamList>
>;
