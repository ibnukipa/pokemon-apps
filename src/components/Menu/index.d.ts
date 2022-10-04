type MenuItemType = {
  text: string;
  value: string;
  subItems?: MenuItemType[];
  level?: number;
  onPressCallback?: Function;
};
