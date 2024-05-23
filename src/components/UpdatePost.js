import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  //border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export const UpdatePost = ({ openEdit, handleCloseEdit, data, handleInputChange, handleUpdatePost }) => {

  useEffect(()=>{
    console.log(data);
  });

  return (
    <div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{ textAlign: "center" }}>Editar Post</h2>
          <FormControl style={{ display: "flex", gap: 20 }}>
            <Box>
              <TextField
                required
                name="userId"
                fullWidth
                value={data.userId}
                //onChange={handleInputChange}
                id="UserId"
                label="UserId"
              />
            </Box>
            <Box>
              <TextField
                required
                name="id"
                fullWidth
                value={data.id}
                onChange={handleInputChange}
                id="Id"
                label="Id"
              />
            </Box>
            <Box>
              <TextField
                required
                name="title"
                fullWidth
                value={data.title}
                onChange={handleInputChange}
                id="Title"
                label="Title"
              />
            </Box>
            <Box>
              <TextField
                required
                name="body"
                fullWidth
                value={data.body}
                onChange={handleInputChange}
                id="Body"
                label="Body"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdatePost}
            >
              Editar
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
