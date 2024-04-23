import { StyleSheet, View, Text } from "react-native";
import { ExpensesSummary } from "./ExpensesSummary";
import { ExpensesList } from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.contianer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
