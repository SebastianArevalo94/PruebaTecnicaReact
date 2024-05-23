import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DeletePost,
  GetPostById,
  GetPosts,
  UpdatePost2,
} from "./services/PostService";
import Button from "@mui/material/Button";
import { UpdatePost } from "./components/UpdatePost";
import Swal from "sweetalert2";
import { CreatePost } from "./components/CreatePost";

function App() {
  
  const initialState = {
    userId: null,
    id: null,
    title: null,
    body: null,
  }

  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState({});
  const [newPost, setNewPost] = useState(initialState);

  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCleanInputs = () => {
    setNewPost(initialState)
  }

  const GetOnePost = (id) => {
    GetPostById(id).then((resp) => {
      //console.log(resp);
      setPostToEdit(resp);
    });
  };

  const handleInputChangeCreate = ({ target }) => {
    setNewPost({ ...newPost, [target.name]: target.value });
  };

  const handleInputChangeEdit = ({ target }) => {
    setPostToEdit({ ...postToEdit, [target.name]: target.value });
  };

  const handleCreatePost = () => {
    CreatePost(newPost)
      .then((resp) => {
        //console.log(resp);
        handleCloseNew();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post creado!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        handleCloseNew();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post creado!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleUpdatePost = () => {
    UpdatePost2(postToEdit)
      .then((resp) => {
        //console.log(resp);
        handleCloseEdit();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post editado!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        handleCloseEdit();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post editado!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Seguro que deseas eliminar este post?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeletePost(id)
          .then((resp) => {
            Swal.fire("Post eliminado!", "", "success");
          })
          .catch(() => {
            Swal.fire("Post eliminado!", "", "success");
          });
      }
    });
  };

  useEffect(() => {
    GetPosts().then((resp) => {
      //console.log(resp);
      setPosts(resp);
    });
  }, []);

  return (
    <div className="App" style={{ margin: 50 }}>
      <h1>Posts</h1>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenNew}
        >
          Crear Nuevo Post
        </Button>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.userId}
                </TableCell>
                <TableCell align="center">{post.id}</TableCell>
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.body}</TableCell>
                <TableCell style={{ display: "flex", gap: 5 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleOpenEdit();
                      GetOnePost(post.id);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <CreatePost
            openNew={openNew}
            data={newPost}
            handleCloseNew={handleCloseNew}
            handleInputChange={handleInputChangeCreate}
            handleCreatePost={handleCreatePost}
            handleCleanInputs={handleCleanInputs}
          />
          <UpdatePost
            openEdit={openEdit}
            handleCloseEdit={handleCloseEdit}
            data={postToEdit}
            handleInputChange={handleInputChangeEdit}
            handleUpdatePost={handleUpdatePost}
          />
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
