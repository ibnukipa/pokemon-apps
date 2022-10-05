type RouteList = {
  Pokemon: {
    itemKey: number;
  };
  PokemonType: {
    type: string;
  };
};

type RouteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<StackParamList>
>;
