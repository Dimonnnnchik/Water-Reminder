import React from "react";
import styles from "./index.module.scss";
import burger from "../../../assets/img/main/burger-foodCalories.png";

const Food = ({ typeOfTip, subtitleTip, calculateCalories }) => {
  const [inputData, setInputData] = React.useState("");
  const [responseData, setResponseData] = React.useState([]);

  const inputTextData = (event) => {
    setInputData(event.target.value); 
  }

  const resultApiCall = () => {
    const modifiedData = responseData.map(obj => {
      return {
        Name: obj.name,
        Calories: obj.calories,
        TotalFat: obj['fat_total_g'],
        Protein: obj['protein_g'],
        Sodium: obj['sodium_mg'],
        Potassium: obj['potassium_mg'],
        Cholesterol: obj['cholesterol_mg'],
        Carbohydrates: obj['carbohydrates_total_g'],
        Fiber: obj['fiber_g'],
        Sugar: obj['sugar_g']
      };
    });
    
    return (
      <ul className={styles.infoData}>
        {modifiedData.map(obj => {
          return Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ));
        })}
      </ul>
    );
  }

  const apiCall = () => {
    fetch('https://api.api-ninjas.com/v1/nutrition?query=' + inputData, {
      method: 'GET',
      headers: { 'X-Api-Key': 'V4LlGQX69ZMa4YxM8WtHCQ==110bSktz9unT4eH0'},
      contentType: 'application/json',
    })
    .then(response => response.json())
    .then(data => setResponseData(data))
    .catch(jqXHR => {
      console.error('Error: ', jqXHR.responseText);
    });
  }

  return (
    <div className={styles.foodCalories}>
      <div className={styles.burgerGroup}>
        <div className={styles.burgerCalories}>
          <img 
            className={styles.foodBurger}
            src={burger}
            alt="burger"
          />
        </div>
        <div className={styles.calculateCalories}>
          <p className={styles.dailyCaloriesTitle}>Your Intake Goal: <span>{calculateCalories()} kl</span></p>
          <p className={styles.dailyCaloriesSubtitle}><span>Special nutrient calculator:</span> now you can easily find out everything about your favorite foods that you consume every day. To request, write the weight in grams or kg and the name of the product</p>
          <div className={styles.infoCalories}>
            <input type="text" name="text" className={styles.inputCalories} placeholder="* 1kg burger *" onChange={inputTextData}></input>
            <button className={styles.buttonSubmit} onClick={apiCall}>Search</button>
          </div>
        </div>
      </div>
      <div className={styles.tipsCalories}>
        <p>{typeOfTip} Tips</p>
        <span className={styles.subtitleTip}>{subtitleTip}</span>
        <div className={styles.burgerCaloriesTips}>
          {/* <div className={styles.popupCalories}>&#128523; Ooops... Waiting for your products )</div> */}
          {resultApiCall()}
        </div>  
      </div>
    </div>
  )
}

export default Food;