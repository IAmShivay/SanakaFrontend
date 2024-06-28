// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
// } from "@mui/material";
// import { leadRegister } from "../../app/leads/leadSlice";
// import { AppDispatch } from "../../store";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

// interface TabWithPopupProps {
//   isOpen: boolean;
//   onSubmit: (data: FormData) => void;
//   formFilled: boolean;
//   onFormChange: (data: { name: string; email: string }) => void;
// }

// interface FormData {
//   name: string;
//   email: string;
//   phoneNumber: string;
// }

// const TabWithPopup: React.FC<TabWithPopupProps> = ({
//   isOpen,
//   onSubmit,
//   onFormChange,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const [phoneError, setPhoneError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Update form data state
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Handle phone number validation
//     if (name === "phoneNumber") {
//       const isValidPhoneNumber = /^\d{10}$/.test(value);
//       setPhoneError(isValidPhoneNumber ? null : "Phone number must be 10 digits.");
//     }

//     // Notify parent component of form changes
//     onFormChange({
//       name: formData.name,
//       email: formData.email,
//     });
//   };

//   const handleSubmit = async () => {
//     if (!phoneError && formData.name && formData.email && formData.phoneNumber) {
//       onSubmit(formData);
//       try {
//         await dispatch(leadRegister(formData));
//         toast.success("Form submitted successfully!");
//       } catch (err: any) {
//         toast.error(err.message || "Something went wrong. Please try again.");
//       } finally {
//         setFormData({
//           name: "",
//           email: "",
//           phoneNumber: "",
//         });
//       }
//     } else {
//       toast.error("Please fill out the form correctly.");
//     }
//   };

//   return (
//     <Dialog open={isOpen}>
//       <DialogTitle>Fill the Form</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="name"
//           label="Name"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="email"
//           label="Email"
//           type="email"
//           fullWidth
//           variant="standard"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="phoneNumber"
//           label="Mobile Number"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           error={!!phoneError}
//           helperText={phoneError}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TabWithPopup;
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
      setEmailError(isValidEmail ? null : "Please enter a valid email address.");
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
        console.log("Form Data:", formData);
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
            <MenuItem value="MBBS">MBBS</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business Administration">
              Business Administration
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="place"
          label="Place"
          type="text"
          fullWidth
          variant="standard"
          value={formData.place}
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
