import axios from "axios";
import { useState } from "react";
import { IWilderProps } from "./Wilder";

const AddWilderForm = () => {
    // Wilder's name is a string, so we pass an empty string to useState
    const [name, setName] = useState<IWilderProps['name']>('');
    const [city, setCity] = useState<IWilderProps['city']>('');
    return (
        <form
            onSubmit={(event) => {
            /* 
            Preventing the default reaction of the event
            (here submitting the form when clicking the button)
            */
            event.preventDefault();
            /* 
            Then giving the desired reaction to the event
            (here using axios to follow the post route of the API
            and giving the name props/value from the form)
             */
            axios.post('http://localhost:3030/api/wilder', { name, city });
            }}
        >
            <label>Name :</label>
            <input
                type='text'
                value={name}
                /*
                Starting with an empty input, detecting changes on the event
                (i.e typing inside the input)
                updating the value of name with the target (=input) value.
                */
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <br />
            <label>City :</label>
            <input
                type='text'
                value={city}
                onChange={(event) => {
                    setCity (event.target.value);
                }}
            />
            <br />
            <button>Add a Wilder</button>
        </form>
    );
};

export default AddWilderForm;