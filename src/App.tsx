import React from 'react';
import './App.css';
import { json } from 'stream/consumers';

function App() {
  function CurrentYear(){
    let year:number = new Date().getFullYear();
    return year;
  }

  let yr:number = CurrentYear();
  let skills:object = fetch('https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=6d2fb34f&app_key=ce174c0029895c00f8f681b107b09bbc')
    .then((value) => value.json())
    .then((data) => {for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element);      
    }
    })
    .catch((error) => console.log(error));
  
  console.log(skills)
  return(
    <>
    <h1>Skill Finder</h1>
    <h2>We are in {yr}</h2>
    <br></br>
    <p></p>
    </>
  )
}

export default App;
