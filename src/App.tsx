import React from 'react';
import { json } from 'stream/consumers';
import { useState } from 'react';

function App() {
  const [InterestedSkill,setInterestedSkill] = useState("");
  const [relevant,setRelevant] = useState<boolean | null>(null);
  const [loading,setLoading] = useState(false);
  function CurrentYear(){
    let year:number = new Date().getFullYear();
    return year;
  }



  async function SkillFinding()
  {
    let dataskills:string[] = [];
    let count:number = 1;
    let skill:string = InterestedSkill;
    while (count < 5)
    {
      setLoading(true);
      setRelevant(null);
      const appId = "6d2fb34f";
      const appKey = "0770cc86d9082a9528d97c2e47e71348"
      const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/${count}?app_id=${appId}&app_key=${appKey}&results_per_page=20&what=${skill}`)
      .then((value) => value.json())
      .then((data) => {
        let i:number = 0;
        for (let i = 0; i < data.results.length; i++)
        {
          if ((data['results'][i]['created'].includes(CurrentYear().toString())) || (data['results'][i]['created'].includes((CurrentYear() - 1).toString()))){
            if ((data['results'][i]['salary_max'] > 50000))
            {
              dataskills.push(data['results'][i])
            }
            
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setRelevant(false);
      })
      .finally(() =>
        setLoading(false)
      )
      count = count + 1;
    }
    console.log("this is",dataskills)
    console.log(dataskills.length)
    if (dataskills.length > 10)
    {
      setRelevant(true);
    }
    else{
      setRelevant(false);
    };
  }
  function getSkill(event:React.ChangeEvent<HTMLInputElement>){
    setInterestedSkill(event.currentTarget.value);
  }  
  let yr:number = CurrentYear();
  let skill:string = 'Marketing'.toLowerCase();
  let urls:string = `https://www.google.com/search?q=what+is+${InterestedSkill}+about`
  return (
    <>
    <h1>Skill Finder</h1>
    <label htmlFor='SkillEnter'>Enter the Skill You Would Be Interested In Learning In {CurrentYear()}:</label>
    <br></br>
    <br></br>
    <input type='text' id='SkillEnter' placeholder='enter skill' onChange={getSkill}></input>
    <br></br>
    <br></br>
    <a href={urls}>
      <button>About This Skill</button>
    </a>
    
    <br></br>
    <br></br>
    <button onClick={SkillFinding} disabled={loading}>{loading ? "Checking skill relevance..." : `See If Skill Is Still Relevant in ${CurrentYear()}`}</button>
      {relevant === true && (
        <h1>This skill is still relevant to learn now</h1>
      )}
      {relevant === false && (
        <h1>This skill is not relevant</h1>
      )}
    </>
  );
}

export default App;
