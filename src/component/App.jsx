import React from "react";
import fruitArray from "../furityvise";

function App() {
  const [text, setText] = React.useState("");
  const [fliterData ,setFliterData] = React.useState("");
  const [display, setVisible] = React.useState(false);

  function handleChange(event) {
    const searchText = event.target.value;
    setText(searchText);
  }

  function handleClick() {
    const fliteredFruit = fruitArray.find((fruit) => { return (fruit.name === text)});
    setFliterData(fliteredFruit);
    setVisible(true);
  }

  return (
    <div className="content">
      <h1>Explore Fruit Nutritions</h1>
      <div className="userInput">
      <select onChange={handleChange} name="fruitList" value={text}>
        {fruitArray.map((data, index) => {
          return (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          );
        })}
      </select>
      <button onClick={handleClick}>Search</button>
      </div>
      <div className="display" style={{ visibility: display ? "visible" : "hidden" }}>
        <h1>{fliterData?.name}</h1>
        <p>Carbohydrates:{fliterData?.nutritions?.carbohydrates}</p>
        <p>Protien:{fliterData?.nutritions?.protein}</p>
        <p>Fat : {fliterData?.nutritions?.fat}</p>
        <p>Calories:{fliterData?.nutritions?.calories}</p>
        <p>Sugar:{fliterData?.nutritions?.sugar}</p>
      </div>
    </div>
  );
}

export default App;
