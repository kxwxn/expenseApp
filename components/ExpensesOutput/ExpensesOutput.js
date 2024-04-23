import { StyleSheet, View } from "react-native";
import { ExpensesSummary } from "./ExpensesSummary";
import { ExpensesList } from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.contianer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
});
