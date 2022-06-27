import React, {useState, useEffect, useCallback} from 'react';
import DataTable from 'react-data-table-component';
import { Card, Form, CardBody, CardHeader, Modal, ModalHeader, ModalBody, Row, Col, Button, ButtonGroup, FormGroup, Label} from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import editIcon  from './edit.png'
import createIcon  from './create.png'
import AddTask  from './AddTask.js'
import customStyles  from './CustomStyle.js'
// import moment from 'moment';
import swal from 'sweetalert';
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import axios from 'axios';

const styles = {
  input: {
    color: "#000",
    opacity: "100%",
    width: "100%"
  },
  multilineColor: {
    color: "#eee"
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
};

const TaskList = (props) => {

  const [data, setData] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [masterID, setMasterID] = useState('');
  const [taskID, setTaskID] = useState('');
  const [totalLength, setTotalLength] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doneProgress, setDoneProgress] = useState(false);
  const [status, setStatus] = useState();
  const [doneVal, setDoneVal] = useState(0);
  const [inProgressVal, setInProgressVal] = useState(0);
  const [TASK_NAME, setName] = useState("");
  const [filterBtn, setFilter] = useState(3);
  const [taskList, setTask] = useState([]);
  const [allData, setAllData] = useState([]);

  // console.log(data, 'taskList')
  // console.log(allData, 'allData')

  const m1 = (data, ids) => data.filter(m => ids.some(c => c.MASTER_ID === m.MASTER_ID && c.MASTER_ID  == 1));
  const m2 = (data, ids) => data.filter(m => ids.some(c => c.MASTER_ID === m.MASTER_ID && c.MASTER_ID  == 2));
  const m3 = (data, ids) => data.filter(m => ids.some(c => c.MASTER_ID === m.MASTER_ID && c.MASTER_ID  == 3));

  const masterNo1 = m1(data, dataM)
  const masterNo2 = m2(data, dataM)
  const masterNo3 = m3(data, dataM)

  const m1InProgress = data.filter(c => c.MASTER_ID  == 1 && c.TASK_STATUS  == 0);
  const m1Done = data.filter(c => c.MASTER_ID  == 1 && c.TASK_STATUS  == 1);
  const m1Complete = data.filter(c => c.MASTER_ID  == 1 && c.TASK_STATUS  == 2);
  const m2InProgress = data.filter(c => c.MASTER_ID  == 2 && c.TASK_STATUS  == 0);
  const m2Done = data.filter(c => c.MASTER_ID  == 2 && c.TASK_STATUS  == 1);
  const m2Complete = data.filter(c => c.MASTER_ID  == 2 && c.TASK_STATUS  == 2);
  const m3InProgress = data.filter(c => c.MASTER_ID  == 3 && c.TASK_STATUS  == 0);
  const m3Done = data.filter(c => c.MASTER_ID  == 3 && c.TASK_STATUS  == 1);
  const m3Complete = data.filter(c => c.MASTER_ID  == 3 && c.TASK_STATUS  == 2);

useEffect(() => {
    fetch("http://localhost:8000/taskList")
      .then(res => res.json())
      .catch((error) => console.error(error))
      .then(res => setData(res));

    fetch("https://mocki.io/v1/84c5ff26-d617-4c1c-ab3c-5d205d42cede")
    .then(res => res.json())
    .catch((error) => console.error(error))
    .then(res => setDataM(res.dataM));

    fetch("http://localhost:8000/taskList")
    .then(res => res.json())
    .then(res => setTotalLength(res.length));

  }, []);

  const refreshData = useCallback(
    () => {
    fetch("http://localhost:8000/taskList")
    .then(res => res.json())
    .catch((error) => console.error(error))
    .then(res => setData(res));

    fetch("https://mocki.io/v1/84c5ff26-d617-4c1c-ab3c-5d205d42cede")
    .then(res => res.json())
    .catch((error) => console.error(error))
    .then(res => setDataM(res.dataM));

    fetch("http://localhost:8000/taskList")
    .then(res => res.json())
    .then(res => setTotalLength(res.length));
  },
  [], // Tells React to memoize regardless of arguments.
);

const onAdd = async (TASK_NAME) => {

  const taskList = {
    MASTER_ID: 1,
    TASK_ID: 13,
    TASK_NAME: TASK_NAME,
    TASK_STATUS: 0
  };

  const allData = [...data, taskList];

  await fetch("http://localhost:8000/taskList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskList)
  })
  .then(setAllData(allData));
  alert("Task added!");
  setModalCreate(!modalCreate);
  refreshData();
}

const toggleUpdate = (event, masterID, taskID) => {
  setModalUpdate(!modalUpdate);
  setMasterID(masterNo1);
  setTaskID(masterNo1);
}


//kiv
const handleSubmitUpdate = (event, TASK_ID) => {

  fetch("http://localhost:8000/taskList" + TASK_ID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(TASK_NAME)
  })
    .then(res => res.json())
    .then(result => {
      setName(TASK_NAME);
      refreshData();
    });
}

//kiv
  const handleDoneProgress = (state) => {
    if (state.selectedRows[0] != undefined) {
      // setDoneProgress(!doneProgress);
      if (masterNo1.length == m1Done.length || masterNo2.length == m2Done.length || masterNo2.length == m2Done.length )
        {
          setStatus(2);
          setDoneProgress(true);
        }
        else {
          setStatus(1);
          setDoneProgress(true);
        }
      if (state.selectedRows[0].TASK_STATUS == 0) {
        setStatus(1);
        setDoneProgress(true);
        // swal({
        //   title: "Status changed to Done",
        //   icon: "success",
        //   button: "Close",
        // })
        refreshData();
      }
      else if (state.selectedRows[0].TASK_STATUS == 1) {
        setDoneProgress(true);
        // swal({
        //   title: "No changes applied",
        //   icon: "error",
        //   button: "Close",
        // })
        // refreshData();
      }
    } else {
      // setDoneProgress(false);
    }
  };

  const rowSelectCritera = row => row.TASK_STATUS == 1 || row.TASK_STATUS == 2;

  const toggleCreate = () => {
    setModalCreate(!modalCreate);
  }

const columns = [
    {
        name: 'Action',
        ignoreRowClick: true,
        cell: row => {
                return (
                          <div>
                            <img alt="" className="edit-icon" src={editIcon} onClick={() => toggleUpdate(row.MASTER_ID, row.TASK_ID)}/>
                          </div>
                      ); 
                    },
    },
    {
        name: 'Task ID',
        selector: row => row['TASK_ID'],
        sortable: true,
    },
    {
        name: 'Task Name',
        selector: row => row['TASK_NAME'],
        sortable: true,
    },
    {
        name: 'Task Status',
        selector: row => row['TASK_STATUS'],
        sortable: true,
        cell: (row) => {
        switch (row.TASK_STATUS) {
          case 1:
            return (
              <div className="p-0">
                <p className="header-text text-done m-2">DONE</p>
              </div>
            );
          case 0:
            return (
              <div className="p-0">
                <p className="header-text text-inprogress m-2">IN PROGRESS</p>
              </div>
            );
          default:
        }
        return (
          <div className="p-0">
            <p className="header-text text-complete m-2">COMPLETE</p>
          </div>
        );
      },
    },
];

const { classes } = props;

      const tabsContent = data.filter(data => data.TASK_ID <= dataM.length).map((text, tabNo) => (
        {
            title: <h6 className="ml-2 p-0 m-0 font-weight-bold text-dark flex-row" key={tabNo}>Task Records {tabNo + 1}</h6>,
            content: <div className="w-100 justify-content-center">
                          <CardHeader className="bg-transparent w-100">
                            <div className="d-flex text-left justify-content-start ml-0">
                              <ButtonGroup>
                                <Button className="btn-inprogress p-2" onClick={() => setFilter(0)}>IN PROGRESS</Button>
                                <Button className="btn-done p-2" onClick={() => setFilter(1)}>DONE</Button>
                                <Button className="btn-complete p-2" onClick={() => setFilter(2)}>COMPLETE</Button>
                                <Button className="btn-all p-2" onClick={() => setFilter(3)}>ALL</Button>
                                </ButtonGroup>
                            </div>
                            <div className="p-1 d-flex text-right justify-content-end mr-0 mb-2">
                              <Button className="btn-done text-center align-items-center"><img alt="" className="create-icon p-2" src={createIcon} onClick={() => toggleCreate()}/></Button>
                              <Form id="SubmitUpdate">
                              <Modal isOpen={modalUpdate} toggle={() => toggleUpdate()} className=""style={{ paddingLeft: "30%", paddingRight: "30%", paddingTop: "20%", alignItems: "center", justifyContent: "center"}}>
                                <ModalHeader style={{textAlign: "center", paddingTop: 0}} toggle={() => toggleUpdate()}><h6 className="text-white font-weight-bold m-1">Update Task</h6></ModalHeader>
                                  <ModalBody className="bg-main-color">
                                    <Row className="p-2">
                                      <Col className="w-75">
                                        <Row>
                                          <TextField className="input-form-textfield" id="masterID" label="Master ID" variant="outlined" size="small" InputLabelProps={{ required: false }} inputProps={{ className: classes.input }} disabled></TextField>
                                        </Row><br />
                                        <Row>
                                          <TextField className="input-form-textfield" id="taskID" label="Task ID" variant="outlined" size="small" InputLabelProps={{ required: false }} inputProps={{ className: classes.input }}></TextField>
                                        </Row><br />
                                      </Col>
                                    </Row>
                                      <Row className="divider-modal" />
                                        <Row>
                                            <Col className="text-right justify-content-right mr-2 mb-2">
                                                <Button className="btn-default p-2 mr-2" onClick={() => toggleUpdate()}>Cancel</Button>
                                                <Button className="btn-submit p-2 mr-2" form="SubmitUpdate" type="submit">Save</Button>
                                            </Col>
                                        </Row>
                                  </ModalBody>
                              </Modal>
                            </Form>
                            <Modal isOpen={modalCreate} toggle={() => toggleCreate()} className=""style={{ paddingLeft: "30%", paddingRight: "30%", paddingTop: "20%", alignItems: "center", justifyContent: "center"}}>
                              <ModalHeader style={{textAlign: "center", paddingTop: 0}} toggle={() => toggleCreate()}><h6 className="text-white font-weight-bold m-1">Create New Task</h6></ModalHeader>
                                <ModalBody className="bg-main-color">
                                  <AddTask onAdd={onAdd}/>
                                </ModalBody>
                            </Modal>
                            </div>
                          {tabNo + 1 == 1 ?
                            <div className="p-1 d-flex text-right justify-content-end mr-0">
                              <p className="header-text text-dark m-2">Total No. Dependencies: {masterNo1.length}</p>
                              <p className="header-text text-done m-2">Total Done Status: {m1Done.length}</p> 
                              <p className="header-text text-complete m-2">Total Completed Status: {m1Complete.length}</p> 
                            </div>
                            : "" ||
                            tabNo + 1 == 2 ?
                            <div className="p-1 d-flex text-right justify-content-end mr-0">
                                <p className="header-text text-dark m-2">Total No. Dependencies: {masterNo2.length}</p>
                                <p className="header-text text-done m-2">Total Done Status: {m2Done.length}</p> 
                                <p className="header-text text-complete m-2">Total Completed Status: {m2Complete.length}</p> 
                            </div>
                            : 
                            <div className="p-1 d-flex text-right justify-content-end mr-0">
                                <p className="header-text text-dark m-2">Total No. Dependencies: {masterNo3.length}</p>
                                <p className="header-text text-done m-2">Total Done Status: {m3Done.length}</p> 
                                <p className="header-text text-complete m-2">Total Completed Status: {m3Complete.length}</p> 
                            </div>
                          }
                          </CardHeader>
                            <DataTable
                              columns={columns}
                              data={(filterBtn == 1 ? (tabNo + 1 == 1 ? m1Done : "") : "") || (filterBtn == 2 ? (tabNo + 1 == 1 ? m1Complete : "") : "") || (filterBtn == 0 ? (tabNo + 1 == 1 ? m1InProgress : "") : (tabNo + 1 == 1 ? masterNo1 : ""))
                              || (filterBtn == 1 ? (tabNo + 1 == 2 ? m2Done : "") : "") || (filterBtn == 2 ? (tabNo + 1 == 2 ? m2Complete : "") : "" ) || (filterBtn == 0 ? (tabNo + 1 == 2 ? m2InProgress : "") : (tabNo + 1 == 2 ? masterNo2 : ""))
                              || (filterBtn == 1 ? (tabNo + 1 == 3 ? m3Done : "") : "") || (filterBtn == 2 ? (tabNo + 1 == 3 ? m3Complete : "") : "" ) || (filterBtn == 0 ? (tabNo + 1 == 3 ? m3InProgress : "") : (tabNo + 1 == 3 ? masterNo3 : ""))
                            }
                              noHeader={true}
                              customStyles={customStyles}
                              pagination
                              selectableRows
                              onSelectedRowsChange={handleDoneProgress}
                              selectableRowSelected={rowSelectCritera}
                              paginationRowsPerPageOptions={[20, 40, 60, 80, 100]}
                            />
                        </div>
        }
      ));

      function getTabs() {
        return tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
      }

    return (
            <div className="w-90">
                  <CardBody className="">
                      <CardHeader><h2 className="text-dark">TASK LISTING PAGE</h2></CardHeader><br/>
                      <Tabs className="" transform={true} showInkBar={true} items={getTabs()}/>
                      <br/><br/>
                  </CardBody>
            </div>
          
    )
  }

export default withStyles(styles)(TaskList);