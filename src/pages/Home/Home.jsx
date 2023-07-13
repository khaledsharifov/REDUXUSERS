import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SearchIcon from "@mui/icons-material/Search";

import Menu from "@mui/material/Menu";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  openModal,
  addUser,
  completedUser,
  deleteUser,
  handleChangefullName,
  closeModal,
  handleChangefullNameEdit,
  handleChangeEmail,
  editUser,
  handleChangeSearch,
  handleChangeSelect,
  closeModalAdd,
  openModalAdd,
  handleChangeAge,
  handleChangeEmailEdit,
  handleChangeAgeEdit,
  handleChangePhone,
  handleChangePhoneEdit,
  handleChangeImg,
  handleChangeImgEdit,
  closeModalDelete,
  openModalDelete,
  delUser,
} from "../../reducers/users";
import "../../App.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (user) => {
    setAnchorEl(null);
    dispatch(openModalDelete());
    dispatch(delUser(user.id))
    console.log(user);
  };

  const handleEditClick = (user) => {
    setAnchorEl(null);
    dispatch(
      openModal({
        id: user.id,
        value2: user.fullName,
        value3: user.email,
        value4: user.age,
        value5: user.phone,
        value6: user.img,
      })
    );
  };

  const users = useSelector(({ users }) => users.list);
  const idxDel = useSelector(({ users }) => users.idxDel);
  const fullName = useSelector(({ users }) => users.fullName);
  const email = useSelector(({ users }) => users.email);
  const age = useSelector(({ users }) => users.age);
  const img = useSelector(({ users }) => users.img);
  const imgEdit = useSelector(({ users }) => users.imgEdit);
  const phone = useSelector(({ users }) => users.phone);
  const phoneEdit = useSelector(({ users }) => users.phoneEdit);
  const ageEdit = useSelector(({ users }) => users.ageEdit);
  const modal = useSelector(({ users }) => users.modal);
  const modalAdd = useSelector(({ users }) => users.modalAdd);
  const modalDelete = useSelector(({ users }) => users.modalDelete);
  const select = useSelector(({ users }) => users.select);
  const search = useSelector(({ users }) => users.search);
  const fullNameEdit = useSelector(({ users }) => users.fullNameEdit);
  const emailEdit = useSelector(({ users }) => users.emailEdit);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="container m-[0_auto]">
        <div className="w-[90%] m-auto">
          <div>
            <h1 className="py-[5px] text-[30px] text-center">USERS LIST</h1>

            <Box
              sx={{ minWidth: 120, paddingBottom: 3, display: "flex", gap: 2, alignItems: "center" }}
            >
            <Button
                      variant="contained"
                      color="primary"
                      sx={{ padding: 2, borderRadius: 2 }}
                      size="small"
                      onClick={() => dispatch(openModalAdd())}
                    >
                      <AddIcon/>
                    </Button>
              <FormControl className="w-[45%]  ">
                <InputLabel id="demo-simple-select-label">
                  Select Todo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select}
                  label="Select Todo"
                  onChange={(event) =>
                    dispatch(handleChangeSelect(event.target.value))
                  }
                >
                  <MenuItem value="all">All Todo </MenuItem>
                  <MenuItem value="com">Completed</MenuItem>
                  <MenuItem value="unCom">Uncompleted </MenuItem>
                </Select>
              </FormControl>
              <div className="relative w-[100%]">
                <button className="absolute text-[30px] text-[#a1a1a1] right-[10px] top-[5px]">
                  <SearchIcon />
                </button>
                <input
                  placeholder="S e a r c h . . ."
                  type="text"
                  value={search}
                  className="border-[1px] w-[100%] shadow-md px-3  py-4 "
                  onChange={(e) => dispatch(handleChangeSearch(e.target.value))}
                />
              </div>
            </Box>

            <table className="w-[100%]">
              <tr className="  border-t border-b border-gray-400 bg-[#fff] ">
                <th className="w-[4%]"></th>
                <th className="w-[15%]">IMG</th>
                <th className="w-[25%] text-left">FULLNAME</th>
                <th className="w-[15%] text-left">E-MAIL</th>
                <th className="w-[15%] text-left">AGE</th>
                <th className="w-[15%] text-left">PHONE</th>
                <th className="w-[8%]"></th>
              </tr>
            </table>

            <div className="flex flex-col">
              {users
                .filter((user) => {
                  if (select == "com") {
                    return user.completed;
                  } else if (select == "unCom") {
                    return !user.completed;
                  } else return user;
                })
                .filter((el) => {
                  return search.toLowerCase() === ""
                    ? el
                    : el.fullName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        el.email.toLowerCase().includes(search.toLowerCase()) ||
                        el.age.toLowerCase().includes(search.toLowerCase()) ||
                        el.phone.toLowerCase().includes(search.toLowerCase());
                })
                .map((user) => {
                  return (
                    <table
                      key={user.id}
                      className=" w-[100%]    py-2  border-t border-b border-gray-400 bg-[#fff]"
                    >
                      <tr className=" w-[100%]    ">
                        <td className="w-[3%]">
                          {" "}
                          <div className="flex gap-6 pl-2 items-center ">
                            <Checkbox
                              {...label}
                              checked={user.completed}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                              onChange={(e) => {
                                dispatch(
                                  completedUser({
                                    id: user.id,
                                    value: e.target.checked,
                                  })
                                );
                              }}
                            />
                          </div>
                        </td>

                        <td className="w-[15%]">
                          <div className=" text-center">
                            <img
                              src={user.img}
                              alt=""
                              className=" w-[80px] h-[80px] rounded-[50px]  m-auto"
                            />
                          </div>
                        </td>
                        <td className="w-[25%]">
                          <div className="">
                            {user.completed ? (
                              <span user="text-[gray]">
                                <s>{user.fullName}</s>
                              </span>
                            ) : (
                              <span>{user.fullName}</span>
                            )}
                          </div>
                        </td>
                        <td className="w-[15%]">
                          <div className="">
                            {user.completed ? (
                              <span className="text-[gray]">
                                <s>{user.email}</s>
                              </span>
                            ) : (
                              <span>{user.email}</span>
                            )}
                          </div>
                        </td>
                        <td className="w-[15%]">
                          <div className="">
                            {user.completed ? (
                              <span className="text-[gray]">
                                <s>{user.age}</s>
                              </span>
                            ) : (
                              <span>{user.age}</span>
                            )}
                          </div>
                        </td>
                        <td className="w-[15%]">
                          <div className="">
                            {user.completed ? (
                              <span className="text-[gray]">
                                <s>{user.phone}</s>
                              </span>
                            ) : (
                              <span>{user.phone}</span>
                            )}
                          </div>
                        </td>
                        <td className="w-[8%]">
                          <div>
                            <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <MoreHorizIcon className="text-[gray]" />
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={() => handleDeleteClick(user)} className="flex gap-4">
                                <DeleteIcon/> 
                                Delete user
                              </MenuItem>
                              <MenuItem onClick={() => handleEditClick(user)}  className="flex gap-4">
                                <EditIcon/>
                                Edit user
                              </MenuItem>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                  );
                })}
              ,
            </div>
          </div>
        </div>
      </div>
      {modal == true ? (
        <div className="bgg w-[100%] h-[100vh] fixed top-0 flex justify-center items-center">
          <div className=" ">
            <div className=" relative bg-[#ffffff] py-[40px] w-[400px] flex items-center justify-center rounded-[10px]">
              <div className="text-[16px] w-[80%]">
                <p className=" text-[20px] text-[#1d1c1c] text-center">Edit user</p>
                <p className=" text-[16px] text-[gray] pt-1">Link/Img</p>

                <input
                  value={imgEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangeImgEdit(e.target.value))
                  }
                />
                <p className=" text-[16px] text-[gray] pt-1">FullName</p>
                <input
                  value={fullNameEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangefullNameEdit(e.target.value))
                  }
                />
                <p className=" text-[16px] text-[gray] pt-1">E-mail</p>

                <input
                  value={emailEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangeEmailEdit(e.target.value))
                  }
                />
                <p className=" text-[16px] text-[gray] pt-1">Age</p>

                <input
                  value={ageEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangeAgeEdit(e.target.value))
                  }
                />
                <p className=" text-[16px] text-[gray] pt-1">Phone</p>
                <input
                  value={phoneEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangePhoneEdit(e.target.value))
                  }
                />
                <div className=" pt-4">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => dispatch(editUser())}
                    >
                      submit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => dispatch(closeModal())}
                    >
                      cancel
                    </Button>
                  </Stack>
                </div>
                <span
                  onClick={() => dispatch(closeModal())}
                  className=" absolute top-2 right-4 cursor-pointer text-[26px] text-gray-500 hover:text-[#000]"
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {modalAdd == true ? (
        <div className="bgg w-[100%] h-[100vh] fixed top-0 flex justify-center items-center">
          <div className=" ">
            <div className=" relative bg-[#ffffff] py-[40px] w-[400px] flex items-center justify-center rounded-[10px]">
              <div className="text-[16px] w-[80%]">
                <p className=" text-[16px] text-[gray]">Add new user</p>

                <div className="pb-4 ">
                  <input
                    className="p-2 w-[100%] border-[#939393] border my-2"
                    placeholder="LinkImg.... "
                    type="text"
                    value={img}
                    onChange={(e) => {
                      dispatch(handleChangeImg(e.target.value));
                    }}
                  />
                  <input
                    className="p-2 w-[100%] border-[#939393] border my-2"
                    placeholder="FullName.... "
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      dispatch(handleChangefullName(e.target.value));
                    }}
                  />
                  <input
                    className="p-2 w-[100%] border-[#939393] border my-2"
                    placeholder="E-mail.... "
                    type="text"
                    value={email}
                    onChange={(e) => {
                      dispatch(handleChangeEmail(e.target.value));
                    }}
                  />

                  <input
                    className="p-2 w-[100%] border-[#939393] border my-2"
                    placeholder="Age.... "
                    type="text"
                    value={age}
                    onChange={(e) => {
                      dispatch(handleChangeAge(e.target.value));
                    }}
                  />
                  <input
                    className="p-2 w-[100%] border-[#939393] border my-2"
                    placeholder="Phone.... "
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      dispatch(handleChangePhone(e.target.value));
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ padding: "7px 0px", borderRadius: 0 }}
                      size="small"
                      onClick={() => {
                        if (
                          fullName.trim().length === 0 ||
                          email.trim().length === 0 ||
                          age.trim().length === 0 ||
                          phone.trim().length === 0 ||
                          img.trim().length === 0
                        )
                          return alert("Enter enithing");
                        dispatch(addUser());
                      }}
                    >
                      +ADD
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ padding: "7px 0px", borderRadius: 0 }}
                      size="small"
                      onClick={() => {
                        dispatch(closeModalAdd());
                      }}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
                <span
                  onClick={() => dispatch(closeModalAdd())}
                  className=" absolute top-2 right-4 cursor-pointer text-[26px] text-gray-500 hover:text-[#000]"
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {modalDelete == true ? (
        <div className="bgg w-[100%] h-[100vh] fixed top-0 flex justify-center items-center">
          <div className=" ">
            <div className=" relative bg-[#ffffff] py-[40px] w-[400px] flex items-center justify-center rounded-[10px]">
              <div className="text-[16px] w-[80%]">
                <p className=" text-[20px] text-[gray] pb-4">Delete User ?</p>
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "7px 0px", borderRadius: 0 }}
                    size="small"
                    onClick={() => {
                      dispatch(deleteUser())
                    }}
                  >
                    OK
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "7px 0px", borderRadius: 0 }}
                    size="small"
                    onClick={() => {
                      dispatch(closeModalDelete());
                    }}
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
              <span
                onClick={() => dispatch(closeModalDelete())}
                className=" absolute top-2 right-4 cursor-pointer text-[26px] text-gray-500 hover:text-[#000]"
              >
                &times;
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
