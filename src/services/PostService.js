export const GetPosts = async () => {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log("Hubo un error " + error);
  }
};

export const GetPostById = async (id) => {
  try {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log("Hubo un error " + error);
  }
};

export const CreatePost = async (post) => {
    try {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log("Hubo un error " + error);
    }
  };

export const UpdatePost2 = async (post) => {
  try {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log("Hubo un error " + error);
  }
};

export const DeletePost = async (id) => {
    try {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log("Hubo un error " + error);
    }
  };
