import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import styles from './App.module.css';

import Wilder, { IWilderProps } from './components/Wilder';
import AddWilderForm from './components/AddWilderForm';

interface ISkillFromAPI {
  id: number;
  name: string;
}

interface IGradeFromAPI {
  rating: number;
  skill: ISkillFromAPI;
}

interface IWilderFromAPI {
  city: string;
  grades: IGradeFromAPI[];
  id: number;
  name: string;
}

const formatWildersFromApi = (wilders: IWilderFromAPI[]): IWilderProps[] =>
  wilders.map((wilder) => {
    return {
      city: wilder.city,
      id: wilder.id,
      name: wilder.name,
      skills: wilder.grades.map((grade) => {
        return {id: grade.skill.id, name: grade.skill.name, rating: grade.rating};
    }),
  };
});

function App() {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  const [apiSkills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiWilders = await axios.get('http://localhost:3030/api/wilder');
      setWilders(formatWildersFromApi(apiWilders.data));

      const apiSkills = await axios.get('http://localhost:3030/api/skill');
      setSkills(apiSkills.data);
      console.log('API SKILLS. = ', apiSkills.data);
    };

    fetchData();
  }, []);

  console.log('setSkills = ', apiSkills);

  

  return(
    <div >
    <header>
      <div className={styles.container}>
        <h1>WildBook</h1>
      </div>
    </header>
    <main className={styles.container}>
      <h2>Wilders</h2>
      <AddWilderForm />
      {/* Passing props to the form to obtain their values in the AddSkillsForm.js */}
      {/* <AddSkillsForm wilders={wilders} skills={skills} /> */}
      <section className={styles.cardRow}>
        {/* Using array.map allows to loop on each element of an array to modifiy it.
            Here we're looping on the wildersDara array, naming each element as 'wilder',
            using props to assign dynamic values to our Wilder component based on
            what we obtained from wildersData.
             */}
        {wilders.map((wilder) => {
          return <Wilder
                    id={wilder.id}
                    city={wilder.city}
                    key={wilder.id}
                    name={wilder.name}
                    skills={wilder.skills}
                    />
        })}
      </section>
    </main>
    <footer>
      <div className={styles.container}>
        <p>&copy; 2023 VictorGugg@WildCodeSchool</p>
      </div>
    </footer>
  </div>);
}

export default App;
