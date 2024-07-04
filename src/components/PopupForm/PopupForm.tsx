
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { leadRegister } from "../../app/leads/leadSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { states } from "./state";
interface TabWithPopupProps {
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  onFormChange: (data: { name: string; email: string }) => void;
  formFilled: boolean;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  course: string;
  place: string;
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
    course: "",
    place: "",
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Update form data state
    setFormData({
      ...formData,
      [name as string]: value as string,
    });

    // Handle phone number validation
    if (name === "phoneNumber") {
      const isValidPhoneNumber = /^\d{10}$/.test(value as string);
      setPhoneError(
        isValidPhoneNumber ? null : "Phone number must be 10 digits."
      );
    }
    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(
        isValidEmail ? null : "Please enter a valid email address."
      );
    }
    // Notify parent component of form changes
    onFormChange({
      name: formData.name,
      email: formData.email,
    });
  };

  const handleSubmit = async () => {
    if (
      !phoneError &&
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.course &&
      formData.place
    ) {
      onSubmit(formData);
      try {
        await dispatch(leadRegister(formData));
        toast.success("Form submitted successfully!");

        // Log form data to console after successful submission
      } catch (err: any) {
        toast.error(err.message || "Something went wrong. Please try again.");
      } finally {
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          course: "",
          place: "",
        });
      }
    } else {
      toast.error("Please fill out the form correctly.");
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
          error={!!emailError}
          helperText={emailError}
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            label="Course"
          >
            <MenuItem value="Pg(Md/Ms)">Pg(Md/Ms)</MenuItem>
            <MenuItem value="MBBS">MBBS</MenuItem>
            <MenuItem value="Bsc.nursing">Bsc.nursing</MenuItem>
            <MenuItem value="Gnm">Gnm </MenuItem>
            <MenuItem value="B.pharma">B.pharma</MenuItem>
            <MenuItem value="B.tech">B.tech</MenuItem>
            <MenuItem value="B.tech lateral">B.tech lateral</MenuItem>
            <MenuItem value="Diploma">Diploma</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="place-label">Place</InputLabel>
          <Select
            labelId="place-label"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            label="Place"
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TabWithPopup;
