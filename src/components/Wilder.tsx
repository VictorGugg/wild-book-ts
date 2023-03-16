import axios from 'axios';
import blank_profile from './../assets/blank_profile.png';
import AddSkillForm from './AddSkillForm';
import Skill, { ISkillProps } from './Skill';
import styles from './Wilder.module.css';

export interface IWilderProps {
    city: string;
    id: number;
    name: string;
    skills: ISkillProps[];
}

const handleDelete = (id: number) => {
    axios.delete('http://localhost:3030/api/wilder/' + id);
};

const Wilder = ({ city, id, name, skills }: IWilderProps) => (
    <article className= {styles.card}>
        <img src={blank_profile} alt={`${name}'s Profile`} />
        <h3>{name}</h3>
        <button onClick={() => handleDelete(id)}>Delete the Wilder</button>
        {city ? <h4>{city}</h4> : null}
        <p>Description du Wilder, ID numéro {id}</p>
        <h4>Wild Skills</h4>
        <ul className={styles.skills}>
        {skills.map((skill) => {
            return <Skill name={skill.name} rating={skill.rating} key={skill.id} id={skill.id} />
            })}
        </ul>
        <AddSkillForm
        wilderId={id}
        wilderName={name}
        />
    </article>
);

export default Wilder;