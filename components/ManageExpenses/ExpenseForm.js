import { Alert, StyleSheet, Text, View } from "react-native";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitBtnLabel,
  editValues,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: editValues ? editValues.amount.toString() : "",
      // isValid: editValues ? true : false, // !!editValues
      isValid: true,
    },
    date: {
      value: editValues ? getFormattedDate(editValues.date) : "",
      isValid: true,
    },
    description: {
      value: editValues ? editValues.description : "",
      isValid: true,
    },
  }); // 입력값은 무조건 문자열이다.

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value, // + 기호가 문자열을 숫자로 변경시켜준다.
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");

      setInputValues((current) => {
        return {
          amount: { value: current.amount.value, isValid: amountIsValid },
          date: { value: current.date.value, isValid: dateIsValid },
          description: {
            value: current.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>What did you buy?</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"), // onChangeText 에 연결된 함수의 매개변수로 제공한다.
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true, // default is true
          autoCapitalize: "sentences",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid data - Please check your entered data again{" "}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

// state의 초기값 데이터를 하이드레이션함으로써 수정컴포넌트를 렌더링한다.
