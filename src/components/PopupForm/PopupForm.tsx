import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface TabWithPopupProps {
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  formFilled: boolean;
  onFormChange: (data: { name: string; email: string; }) => void;
}

interface FormData {
  name: string;
  email: string;
  PhoneNumber: string;
}

const TabWithPopup: React.FC<TabWithPopupProps> = ({ isOpen, onSubmit}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    PhoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
      onSubmit(formData);
      console.log(formData)
   
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
          name="PhoneNumber"
          label="Mobile Number"
          type="number"
          fullWidth
          variant="standard"
          value={formData.PhoneNumber}
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

