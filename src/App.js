import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {Input} from '@material-ui/core';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>

//   );
// }


function App() {
  const [eventArray, setEventArray] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);


  function addNewEvent(eventName) {
    let newEvent = {
      name: eventName,
      status: false,
      number: eventArray.length + 1,
    };
    // React State Hook will not render the components if the state array's address does not change
    // Therefore, we cannot use "let newEventArray = eventArray" here
    let newEventArray = eventArray.slice(0);
    newEventArray.push(newEvent);
    setEventArray(newEventArray);
    // alert("new array = " + JSON.stringify(newEventArray));
    // alert("new event array = " + JSON.stringify(eventArray));
  }


  function toggleStatus(eventObj) {
    let newArray = eventArray.slice(0);
    let eventIndex = newArray.indexOf(eventObj);
    if (eventIndex === -1) {
      alert("Error in toggle status function: cannot find such event: " + JSON.stringify(eventObj));
      return null;
    }
    newArray[eventIndex].status = !newArray[eventIndex].status;
    setEventArray(newArray);
    // alert("new array = " + JSON.stringify(newArray));
    // alert("new event array = " + JSON.stringify(eventArray));
  }


  function deleteEvent(eventObj) {
    let newArray = eventArray.slice(0);
    let eventIndex = newArray.indexOf(eventObj);
    if (eventIndex === -1) {
      alert("Error in delete event: cannot find such event: " + JSON.stirngify(eventObj));
      return null;
    }
    newArray.splice(eventIndex, 1);
    setEventArray(newArray);
    // alert("new event array = " + JSON.stringify(eventArray));
  }


  function setStatusFilterFunc(value) {
    setStatusFilter(value);
  }


  return (
    <div>
      <h1>My React to-do list</h1>
      <hr />
      <EventAdder 
        addNewEvent={addNewEvent}/>
      <EventFilter 
        setStatusFilterFunc={setStatusFilterFunc}/>
      <EventViewer 
        eventArray={eventArray}
        statusFilter={statusFilter}
        toggleStatus={toggleStatus}
        deleteEvent={deleteEvent} />
    </div>
  );
}


function EventAdder(props) {
  const [eventName, setEventName] = useState("");

  function handleChange(event) {
    setEventName(event.target.value);
  }

  function handleClick() {
    props.addNewEvent(eventName);
  }

  return (
    <div>
      <Input 
        placeholder="请输入事件名..."
        onChange={handleChange}></Input>
      <Button 
        style={{marginLeft: "20px", marginRight: "20px"}}
        variant="contained" 
        color="primary"
        onClick={handleClick}>添加事件</Button>
    </div>
  );
}

function EventFilter(props) {

  function showAll() {
    props.setStatusFilterFunc(null);
  }

  function showFinished() {
    props.setStatusFilterFunc(true);
  }

  function showUnfinished() {
    props.setStatusFilterFunc(false);
  }

  return (
    <div>
        <Button 
          style={{marginLeft: "20px", marginRight: "20px"}}
          variant="contained" 
          color="primary"
          onClick={showAll}>显示全部</Button>
        <Button 
          style={{marginLeft: "20px", marginRight: "20px"}}
          variant="contained" 
          color="primary"
          onClick={showFinished}>显示已完成</Button>
        <Button 
          style={{marginLeft: "20px", marginRight: "20px"}}
          variant="contained" 
          color="primary"
          onClick={showUnfinished}>显示未完成</Button>
    </div>
  );
}

function EventViewer(props) {
  // let toggleStatus = props.toggleStatus;
  // let deleteEvent = props.deleteEvent;

  return (
    <div>
      {props.eventArray.map(function(item, index) {
        if (props.statusFilter === null || (item.status === props.statusFilter)) {
          return (
            <EventRow 
              key={index}
              event={item}
              toggleStatus={props.toggleStatus}
              deleteEvent={props.deleteEvent} />
          );
        }
        else {
          return null;
        }
      })}
    </div>
  );
}


function EventRow(props) {
  function toggleStatus() {
    props.toggleStatus(props.event);
  }

  function deleteEvent() {
    props.deleteEvent(props.event);
  }

  return (
    <div>
      <span className="white-space-enable">{props.event.name}       {(props.event.status === true)? "已完成" : "未完成"}       {props.event.number}</span>
      <Button
        style={{marginLeft: "20px", marginRight: "20px"}}
        variant="contained"
        color="primary"
        onClick={toggleStatus}>{(props.event.status === true)? "尚未完成" : "完成任务"}</Button>
      <Button
        style={{marginLeft: "20px", marginRight: "20px"}}
        variant="contained"
        color="primary"
        onClick={deleteEvent}>删除任务</Button>
    </div>
  )
}


export default App;