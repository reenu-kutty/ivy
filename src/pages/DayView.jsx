import {useParams} from "react-router-dom";
import './DayView.css'
import {useEffect, useState} from "react";


function DayView() {
    const {date} = useParams();
    const [month, day, year] = date.split("-");
    const [isLoading, setIsLoading] = useState(false);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [text, setText] = useState("");
    const [entries, setEntries] = useState([]);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        if (text.trim() === "") return;

        const newEntry = {
            text: text,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setEntries([...entries, newEntry]);
        setText("");
    };


    async function loadUp() {
        setIsLoading(true);

        await delayMs(2000);

        const retrievedEntry = {
            text: "sample journal entry that would have been written previously and fetched by a call to the db. hi silas :D",
            time: "12:01 AM"
        };

        setEntries([...entries, retrievedEntry]);

        // there would be a network call to the db for the saved journal entry here! delay to simulate this :)
        setIsLoading(false);
    }

    useEffect(() => {
        loadUp();
    }, []);


    console.log(month);
    return (
        <article>
            <div id="dayview-header">
                <h1>{monthNames[month - 1]} {day}, {year}</h1>
            </div>
            <div>
                {isLoading ? (
                    <h2>Loading</h2>
                ) : (
                    <div id="dayview-content">
                        <textarea
                            value={text}
                            onChange={handleChange}
                            placeholder="spill your deepest darkest secrets..."
                        />
                        <button onClick={handleSave}>Save</button>

                        <div>
                            <h2>Saved Entries</h2>
                            <ul>
                                {entries.map((entry, index) => (
                                    <li key={index}>
                                        <b>{entry.time}:</b> {entry.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default DayView;

