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

const TabWithPopup: React.FC<TabWithPopupProps> = ({
  isOpen,
  onSubmit,
  onFormChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data state
    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle phone number validation
    if (name === "phoneNumber") {
      const isValidPhoneNumber = /^\d{10}$/.test(value);
      setPhoneError(isValidPhoneNumber ? null : "Phone number must be 10 digits.");
    }

    // Notify parent component of form changes
    onFormChange({
      name: formData.name,
      email: formData.email,
    });
  };

  const handleSubmit = async () => {
    if (!phoneError && formData.name && formData.email && formData.phoneNumber) {
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
    } else {
      alert("Please fill out the form correctly.");
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
          label="Place"
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
          type="text"
          fullWidth
          variant="standard"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!phoneError}
          helperText={phoneError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TabWithPopup;
