import React, { useState, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/?_limit=4")
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, []);
  const [postData, setPostData] = useState({
    userId: 1,
    id: uuidv4(),
    title: "",
    body: "",
  });

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let newData = {};
    editData ? (newData = { ...editData }) : (newData = { ...postData });
    newData[name] = value;
    editData ? setEditData(newData) : setPostData(newData);
  }

  function handleClickDelete(id) {
    setFetchData((prev) =>
      prev.filter((data) => {
        return data.id !== id;
      })
    );
  }
  function handleEditAddClick(props) {
    let newTableData = [];
    if (props !== null) {
      fetchData.map((data) => {
        if (data.id === props.id) {
          return (
            (data.userId = props.userId),
            (data.id = props.id),
            (data.title = props.title),
            (data.body = props.body)
          );
        } else return data;
      });
      newTableData = [...fetchData];
      setFetchData(newTableData);
    }
    setEditData(null);
  }

  function handleAddClick() {
    let newTableData = [];
    newTableData = [...fetchData, postData];
    setFetchData(newTableData);
    setPostData({
      userId: "",
      id: "",
      title: "",
      body: "",
    });
  }
  function handleEditClick(data) {
    const newEditData = {
      userId: 1,
      id: data.id,
      title: data.title,
      body: data.body,
    };
    setEditData(newEditData);
  }

  return (
    <div className="content">
      <div className="field">
        <input
          type="text"
          onInput={handleInputChange}
          name="title"
          placeholder="Enter Title"
          value={editData == null ? postData.title : editData.title}
        />
        <textarea
          rows="5"
          onInput={handleInputChange}
          name="body"
          placeholder="Enter Post"
          value={editData == null ? postData.body : editData.body}
        ></textarea>
        <button
          onClick={
            editData ? () => handleEditAddClick(editData) : handleAddClick
          }
        >
          Add
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Post</td>
            <td>Delete</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {fetchData.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.body}</td>
              <td>
                <button onClick={() => handleClickDelete(data.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleEditClick(data)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
