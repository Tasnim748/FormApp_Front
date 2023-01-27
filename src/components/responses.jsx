import { useState, useEffect } from "react";
import { INPUT_URL } from "../data/backEndLinks";


const Responses = () => {
    const [responses, setResponses] = useState([]);

    let fetchResponses = async () => {
        let resp = await fetch(INPUT_URL);
        let data = await resp.json();
        console.log(data);
        setResponses(data);
    }

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
    }

    useEffect(() => {
        fetchResponses();
    }, []);

    return (
        <div style={{margin: "5rem"}}>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sectors</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        responses.map(resp => {
                            let sectors = "";
                            resp.sectors.forEach(sec => {
                                sectors = sectors + sec.name + ", ";
                            });
                            return (
                                <tr>
                                    <th scope="row">{resp.id}</th>
                                    <td>{resp.username}</td>
                                    <td>{sectors}</td>
                                    <td>{resp.date + " " +  getMonthName(resp.month) + ", " + resp.year}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Responses;