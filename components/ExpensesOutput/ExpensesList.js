import { View, FlatList, Text } from "react-native";
import { ExpenseItem } from "./ExpenseItem";

export const ExpensesList = ({ expenses }) => {
  const renderLists = ({ item }) => {
    return (
      <ExpenseItem
        description={item.description}
        date={item.date}
        amount={item.amount}
        id={item.id}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderLists}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
