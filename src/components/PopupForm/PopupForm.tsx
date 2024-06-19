import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { leadRegister } from "../../app/leadSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

interface TabWithPopupProps {
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  formFilled: boolean;
  onFormChange: (data: { name: string; email: string }) => void;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

const TabWithPopup: React.FC<TabWithPopupProps> = ({ isOpen, onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    onSubmit(formData);
    try {
      dispatch(leadRegister(formData));
    } catch (err) {
      console.log(err);
    } finally {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
      });
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Fill the Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Mobile Number"
          type="number"
          fullWidth
          variant="standard"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TabWithPopup;
