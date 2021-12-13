import React,{useState,useEffect} from "react";

function App(){
    const [fetchData, setFetchData] = useState([]);
   
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/?_limit=4')
        .then(res => res.json()).then(data=> setFetchData(data));
    }, [])
    const [postData, setPostData] = useState({
        userId : 1,
        id : 0,
        title :"",
        body:""
        });


    function handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        const newData = {...postData}
        newData[name] = value;
        setPostData(newData);
           }

    function handleClickDelete(id){
        setFetchData(prev => prev.filter(data => {
          return data.id !== id
        }));
    }

    function handleAddClick(){
        const newTableData = [...fetchData,postData];
        setFetchData(newTableData);
    }

    return (<div className="content">
        <div className="field">
        <input type="text" onChange={handleInputChange} name="title" placeholder="Enter Title" value={postData.title} />
        <textarea rows="5" onChange={handleInputChange} name="body" placeholder="Enter Post" value={postData.post}></textarea>
        <button onClick={handleAddClick}>Add</button>
        </div>
        <table>
        <thead>
        <tr>
            <td>Title</td>
            <td>Post</td>
            <td>Delete</td>
            <td>Edit</td>
            </tr>
        </thead>
            <tbody>
            {fetchData.map((data,index)=> (<tr key={index}>
                <td>{data.title}</td>
                <td>{data.body}</td>
                <td><button id={data.id} onClick={()=>handleClickDelete(data.id)}>Delete</button></td>
            </tr>))}
        </tbody>
        </table>
    </div>);

}

export default App;