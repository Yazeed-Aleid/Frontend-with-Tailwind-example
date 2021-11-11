import React from "react";
import { useEffect, useState } from "react"
import axios from 'axios'


export default function HW() {
    let [homeWork, setHomeWork] = useState([]);
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [link, setLink] = useState("")
    let [enableEdit, setEnable] = useState(false)
    let [saveId, setId] = useState()
    useEffect(() => {
        axios.get('http://localhost:3001/mainHW/getHW')
            .then((res) => {
                console.log(res.data);
                setHomeWork(res.data)
            })
    }, [])


    function hwPost(e) {
        e.preventDefault()
        console.log(e);
        console.log(e.target.form[0].value);
        axios.post('mainHW/postData', { data: { title: title, description: description, link: link } })
            .then((res) => {

                setHomeWork(res.data)

            })

    }


    function putPost(e, id, title , description , link) {
        e.preventDefault()
        console.log(e);
        setLink(link)
        setDescription(description)
        setTitle(title)
        console.log(title);
        setEnable(true)
        setId(id)
    }


    function save(e, id) {
       
        e.preventDefault()
        axios.put(`/mainHW/putHW/${id}`, { data: { title: title , description:description , link :link} })


            .then((res) => {
                setHomeWork(res.data)
            })

            setEnable(false)

    }


    function deletePost(e, id) {
        e.preventDefault()
        axios.delete(`/mainHW/deleteHW/${id}`)
            .then((res) => {
                setHomeWork(res.data)
            })

    }




    return (
        <div>
            {homeWork.map((elem) => {
                return (
                    <div>

                        <h1>  {elem.title}</h1>
                        <h3>{elem.description}</h3>
                        <h4>  {elem.link}</h4>
                        
                        <button onClick={((e) => { deletePost(e, elem.id) })}>delete</button>
                        <button onClick={(e => { putPost(e, elem.id, elem.title , elem.description ,elem.link) })}>Edit</button>
              

                    </div>
                )
            })}

            <form>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}></input><br />
                <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description}></input><br />
                <input type="text" placeholder="Title" onChange={(e) => setLink(e.target.value)} value={link}></input><br />
                
                
                {(function () {
                    if (enableEdit) {
                        return <button onClick={(e => { save(e, saveId) })}>save</button>;
                    }
                })()}
                <button onClick={((e) => { hwPost(e) })}>Add</button>
            </form>


        </div>
    )

}