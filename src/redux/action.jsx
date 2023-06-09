import { Set_Meal } from "./actionfiles";

export function addMeal(e) {
  console.log(e);
  console.log(Set_Meal);
  return function mealdata(dispatch) {
    const data = dispatch({ type: Set_Meal, payload: 2 });
    return data;
  };
}
