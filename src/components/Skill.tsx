import styles from './Skill.module.css';

export interface ISkillProps {
    id: number;
    name: string;
    rating: number;
}

const Skill = ({ id, name, rating }: ISkillProps) => (
    <li>
        {name}
        <span className={styles.rating}>{rating}</span>
    </li>
);

export default Skill;