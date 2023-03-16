import axios from "axios";
import { useState } from "react";
import IGradeProps from "./Grade";
import { ISkillProps } from "./Skill";
import { IWilderProps } from "./Wilder";


const AddSkillForm = ({wilderId, wilderName, apiSkills}:
    {wilderId: IWilderProps['id'],
    wilderName: IWilderProps['name'],
    apiSkills: ISkillProps[]}) => {
    const [selectedSkill, setSelectedSkill] = useState<ISkillProps['name']>();
    const [rating, setRating] = useState<IGradeProps['rating']>();
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                axios.post('http://localhost:3030/api/grade', {
                    wilderId: wilderId,
                    skillName: selectedSkill,
                    rating: rating,
                });
            }}
            >
            <h3>Add a Skill to {wilderName}</h3>
            <label>Skills :</label>
            <select
                onChange={(event) => {
                    setSelectedSkill(event.target.value);
                }}
                multiple={true}
                defaultValue={['disabled']}
            >
                <option value='disabled' disabled>
                    Select skills
                </option>
                {apiSkills.map(skill => (
                    <option key={skill.id} value={skill.name}>
                        {skill.name}
                    </option>
                ))}
            </select>
            <br />
            <label>Grade :
                <input
                onChange={(event) => {
                    setRating(parseInt(event.target.value));
                }}
                type='number'
                min='0'
                max='10'
                defaultValue='5'
                />  
            </label>
            <br />
            <button>Update the skills of {wilderName}</button>
        </form>
    );
}
export default AddSkillForm;