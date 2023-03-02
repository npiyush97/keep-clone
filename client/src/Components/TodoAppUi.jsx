/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, Fragment, useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { v4 } from "uuid";
import axios from "axios";

function TodoUiApp() {
  const [todos, setTodos] = useState([]);
  // const [user,setUser] = useState([])
  const [authCheck, setAuthCheck] = useState(true);
  const [username, setusername] = useState(localStorage.getItem("user-name") || "user");
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8080/user-todos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res) => {
          const user = res.data.todos;
          setusername(res.data.name);
          localStorage.setItem("user-name", res.data.name);
          setTodos(user);
          setAuthCheck(!authCheck);
        })
        .catch((err) => {
          console.log(err.code, "this");
          navigate("/");
        });
    };
    getData();
  }, []);

  const handleTodoAdd = () => {
    if (inputText) {
      const obj = {
        id: v4(),
        todo: inputText,
        completed: false,
      };
      axios
        .post("http://localhost:8080/posttodo", obj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setTodos([...todos, obj]);
            setInputText("");
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogout = () => {
    localStorage.clear("user-email");
    localStorage.clear("user-name");
    navigate("/");
  };

  const handleChange = (index, checked) => {
    const item = todos[index];
    item.completed = checked;
    setTodos([...todos]);
    const payload = {
      id: index,
      isChecked: checked,
      email: localStorage.getItem("user-email"),
    };
    axios
      .put("http://localhost:8080/update", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeTodo = (index) => {
    axios
      .post(
        "http://localhost:8080/delete-todo",
        { data: index },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setTodos([...res.data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function renderTodos(todoItems) {
    return todoItems.map((todoItem, idx) => (
      <div className="items-center flex justify-between w-full">
        <div>
          <label className={todoItem.completed ? "line-through" : ""}>
            <input
              onChange={(e) => handleChange(idx, e.target.checked)}
              className="mr-2"
              id={todoItem.id}
              type="checkbox"
              value={todoItem.todo}
              checked={todoItem.completed}
            />
            {todoItem.todo}
          </label>
        </div>
        <FontAwesomeIcon
          onClick={() => removeTodo(todoItem.id)}
          className="cursor-pointer bg-red-100 mr-5"
          icon={faTrash}
        />
      </div>
    ));
  }
  return (
    <div className="bg-red-100 h-full w-full flex flex-col items-center align-center">
      <nav className="w-full h-10 flex items-center justify-between bg-slate-200">
        <Link to="/dashboard" className="ml-5">
          Dashboard
        </Link>
        <span>Todolist</span>

        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {username}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
      <h1 className="m-5">Things to remember or todo</h1>
      <div className="h-3/5 w-1/2 mt-2 flex flex-col items-center border-2 border-gray-500 rounded  bg-amber-200">
        <div className="w-full mb-5 flex flex-col align-center justify-center items-center sm:flex-row">
          <input
            required
            className="w-10/12 rounded mt-5 mb-5 p-2 outline outline-offset-1 outline-blue-500  focus:outline-red-500 sm:w-1/2 m-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="button"
            onClick={handleTodoAdd}
            className="w-10/12 bg-blue-100 outline outline-offset-1 outline-blue-500 p-2 rounded w-1/2 sm:w-1/4 m-2"
          >
            Add
          </button>
        </div>
        <div className="render-todos flex flex-col items-center w-3/4 overflow-x-auto">
          {renderTodos(todos)}
        </div>
      </div>
    </div>
  );
}

export default TodoUiApp;
