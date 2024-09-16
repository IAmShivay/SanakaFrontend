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
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { toast } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0035B3",
    },
  },
});

const SimplePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phoneNumber") {
      const isValidPhoneNumber = /^\d{10}$/.test(value);
      setPhoneError(isValidPhoneNumber ? null : "Phone number must be 10 digits.");
    }
    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(isValidEmail ? null : "Please enter a valid email address.");
    }
  };

  const handleSubmit = () => {
    if (!phoneError && !emailError && formData.name && formData.email && formData.phoneNumber && formData.course && formData.place) {
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        course: "",
        place: "",
      });
      setIsOpen(false);
    } else {
      toast.error("Please fill out the form correctly.");
    }
  };

  const isFormValid = !phoneError && !emailError && formData.name && formData.email && formData.phoneNumber && formData.course && formData.place;

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Fill the Form</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
              required
            />
            <TextField
              margin="dense"
              name="phoneNumber"
              label="Mobile Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!phoneError}
              helperText={phoneError}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                label="Course"
                required
              >
                <MenuItem value="Pg(Md/Ms)">Pg(Md/Ms)</MenuItem>
                <MenuItem value="MBBS">MBBS</MenuItem>
                <MenuItem value="Bsc.nursing">Bsc.nursing</MenuItem>
                <MenuItem value="Gnm">Gnm</MenuItem>
                <MenuItem value="B.pharma">B.pharma</MenuItem>
                <MenuItem value="B.tech">B.tech</MenuItem>
                <MenuItem value="B.tech lateral">B.tech lateral</MenuItem>
                <MenuItem value="Diploma">Diploma</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="place-label">Place</InputLabel>
              <Select
                labelId="place-label"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                label="Place"
                required
              >
                {/* Replace with your actual state options */}
                <MenuItem value="State1">State1</MenuItem>
                <MenuItem value="State2">State2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            variant="contained"
            sx={{
              bgcolor: "#0035B3",
              color: "white",
              "&:hover": {
                bgcolor: "#002188",
              },
            }}
          >
            Submit
          </Button>
          <Button onClick={() => setIsOpen(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SimplePopup;
