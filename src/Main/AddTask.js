import React from "react";
import { Form, Row, Col, Button } from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

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

const AddTask = ({onAdd}) => {

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    onAdd(event.target.TASK_NAME.value);
    event.target.TASK_NAME.value = "";
  };

  return (
    <div>
        <Form id="SubmitCreate" onSubmit={handleSubmitCreate}>
            <Row className="p-2">
                <Col className="w-75">
                <Row>
                    <TextField className="input-form-textfield" name="TASK_NAME" label="Task Name" variant="outlined" size="small" InputLabelProps={{ required: false }} ></TextField>
                </Row><br />
                </Col>
            </Row>
                <Row className="divider-modal" />
                <Row>
                    <Col className="text-right justify-content-right mr-2 mb-2">
                        <Button className="btn-default p-2 mr-2">Cancel</Button>
                        <Button className="btn-submit p-2 mr-2" type="submit" onSubmit={handleSubmitCreate}>Save</Button>
                    </Col>
                </Row>
        </Form>
    </div>
  );
}
export default withStyles(styles)(AddTask);
