type RouteList = {
  Pokemon: {
    id: number;
  };
};

type PokemonScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Pokemon'>,
  StackNavigationProp<StackParamList>
>;
