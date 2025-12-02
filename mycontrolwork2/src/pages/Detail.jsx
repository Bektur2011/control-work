import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function Detail() {
    const [task, setTask] = useState();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/tasks/${id}`)
        .then(({data}) => setTask(data))
        .catch((e) => {console.log(e);})
    }, [id]);

  return (
    <div className="container">
        <p style={{cursor: 'pointer', color: '#0475FF', marginBottom: '36px'}} onClick={() => navigate(-1)}> ← Назад</p>

        <div style={{display: 'flex', gap: '70px'}}>
        <h1>{task?.title}</h1>
        {
            task?.status &&  task?.status === 'High' ? (
                <span style={{backgroundColor: 'red', color: 'white', padding: '4px 24px', borderRadius: '30px'}}>{task?.status}</span>
            ) : task?.status === 'Middle' ? (
                <span style={{backgroundColor: 'orange', color: 'white', padding: '4px 24px', borderRadius: '30px'}}>{task?.status}</span>
            ) : (
                <span style={{backgroundColor: 'green', color: 'white', padding: '4px 24px', borderRadius: '30px'}}>{task?.status}</span>
            )
        }
        </div>
        <p>{task?.text}</p>
    </div>
  )
}
