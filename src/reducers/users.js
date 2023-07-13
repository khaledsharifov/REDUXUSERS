import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  fullName: "",
  email: "",
  img: "",
  age: "",
  phone: "",
  phoneEdit: "",
  imgEdit: "",
  modal: false,
  modalAdd: false,
  modalDelete: false,
  fullNameEdit: "",
  emailEdit: "",
  ageEdit: "",
  idx: null,
  idxDel: null,
  select: "",
  search: "",
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    delUser(state, action) {
      state.idxDel = action.payload;
    },
    handleChangeEmail(state, action) {
      state.email = action.payload;
    },
    handleChangeAge(state, action) {
      state.age = action.payload;
    },
    handleChangePhone(state, action) {
      state.phone = action.payload;
    },
    handleChangePhoneEdit(state, action) {
      state.phoneEdit = action.payload;
    },

    handleChangefullName(state, action) {
      state.fullName = action.payload;
    },
    handleChangeImg(state, action) {
      state.img = action.payload;
    },
    handleChangefullNameEdit(state, action) {
      state.fullNameEdit = action.payload;
    },
    handleChangeImgEdit(state, action) {
      state.imgEdit = action.payload;
    },
    handleChangeAgeEdit(state, action) {
      state.ageEdit = action.payload;
    },
    handleChangeEmailEdit(state, action) {
      state.emailEdit = action.payload;
    },
    handleChangeSelect(state, action) {
      state.select = action.payload;
    },
    handleChangeSearch(state, action) {
      state.search = action.payload;
    },

    addUser(state) {
      state.list.push({
        id: new Date().getTime(),
        img: state.img,
        fullName: state.fullName,
        email: state.email,
        age: state.age,
        phone: state.phone,
        completed: false,
      });
      state.fullName = "";
      state.email = "";
      state.age = "";
      state.img = "";
      state.phone = "";
      state.modalAdd = false;
    },
    deleteUser(state, action) {
      state.list = state.list.filter((user) => user.id !== state.idxDel);
      state.modalDelete = false;
    },
    completedUser(state, action) {
      const { id, value } = action.payload;
      state.list = state.list.map((user) => {
        if (user.id === id) {
          user.completed = value;
        }
        return user;
      });
    },
    openModal(state, action) {
      const { id, value2, value3, value4, value5, value6 } = action.payload;
      (state.modal = true),
        (state.fullNameEdit = value2),
        (state.imgEdit = value6),
        (state.idx = id),
        (state.emailEdit = value3),
        (state.ageEdit = value4),
        (state.phoneEdit = value5);
    },
    closeModal(state, action) {
      state.modal = false;
    },
    openModalAdd(state, action) {
      state.modalAdd = true;
    },
    closeModalAdd(state, action) {
      state.modalAdd = false;
    },
    openModalDelete(state, action) {
      state.modalDelete = true;
    },
    closeModalDelete(state, action) {
      state.modalDelete = false;
    },
    editUser(state, action) {
      state.list = state.list.map((user) => {
        if (user.id == state.idx) {
          user.fullName = state.fullNameEdit;
          user.email = state.emailEdit;
          user.age = state.ageEdit;
          user.phone = state.phoneEdit;
          user.img = state.imgEdit;
        }
        return user;
      });
      state.modal = false;
    },
  },
});
export const {
  delUser,
  handleChangeImgEdit,
  closeModalDelete,
  openModalDelete,
  handleChangeImg,
  handleChangePhoneEdit,
  handleChangeAgeEdit,
  openModalAdd,
  handleChangeAge,
  closeModalAdd,
  handleChangeEmail,
  addUser,
  handleChangeSearch,
  editUser,
  handleChangeSelect,
  deleteUser,
  selectUser,
  completedUser,
  handleChangefullName,
  openModal,
  closeModal,
  handleChangefullNameEdit,
  handleChangeEmailEdit,
  handleChangePhone,
} = slice.actions;

export default slice.reducer;
