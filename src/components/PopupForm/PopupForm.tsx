import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  SelectChangeEvent,
} from "@mui/material";
import { leadRegister } from "../../app/leads/leadSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { states } from "./state";
import { auth } from "../../firebase/firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  course: string;
  place: string;
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0035B3",
    },
    secondary: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

const StandaloneForm: React.FC = () => {
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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "phoneNumber") {
        const isValidPhoneNumber = /^\d{10}$/.test(value);
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
    },
    []
  );

  const setupRecaptcha = useCallback(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  const sendOtp = useCallback(async () => {
    if (!phoneError && formData.phoneNumber) {
      try {
        setVerificationInProgress(true);
        setupRecaptcha();
        const phoneNumber = "+91" + formData.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        setConfirmationResult(confirmation);
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setVerificationInProgress(false);
      }
    }
  }, [phoneError, formData.phoneNumber, setupRecaptcha]);

  const verifyOtp = useCallback(async () => {
    if (confirmationResult && otp) {
      try {
        setVerificationInProgress(true);
        await confirmationResult.confirm(otp);
        toast.success("Phone number verified successfully!");
        setIsPhoneVerified(true);
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Invalid OTP. Please try again.");
      } finally {
        setVerificationInProgress(false);
      }
    }
  }, [confirmationResult, otp]);

  useEffect(() => {
    if (!phoneError && formData.phoneNumber.length === 10 && !otpSent) {
      sendOtp();
    }
  }, [formData.phoneNumber, phoneError, otpSent, sendOtp]);

  useEffect(() => {
    if (otp.length === 6 && !isPhoneVerified) {
      verifyOtp();
    }
  }, [otp, isPhoneVerified, verifyOtp]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        !phoneError &&
        formData.name &&
        formData.email &&
        formData.phoneNumber &&
        formData.course &&
        formData.place &&
        isPhoneVerified
      ) {
        try {
          await dispatch(leadRegister(formData));
          toast.success("Form submitted successfully!");
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            course: "",
            place: "",
          });
          setOtpSent(false);
          setOtp("");
          setIsPhoneVerified(false);
        } catch (err: any) {
          toast.error(err.message || "Something went wrong. Please try again.");
        }
      } else {
        toast.error(
          "Please fill out the form correctly and verify your phone number."
        );
      }
    },
    [dispatch, formData, isPhoneVerified, phoneError]
  );

  const isFormValid = useMemo(() => {
    return (
      !phoneError &&
      !emailError &&
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.course &&
      formData.place &&
      isPhoneVerified
    );
  }, [emailError, formData, isPhoneVerified, phoneError]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "inherit",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          Registration Form
        </Typography>
        <TextField
          autoFocus
          margin="normal"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
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
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
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
          sx={{ mb: 2 }}
        />
        {otpSent && !isPhoneVerified && (
          <Box mt={2} mb={2}>
            <TextField
              margin="normal"
              name="otp"
              label="Enter OTP"
              type="text"
              fullWidth
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        )}
        {verificationInProgress && (
          <Typography color="primary" mt={2} mb={2}>
            Processing...
          </Typography>
        )}
        {isPhoneVerified && (
          <Typography
            color="secondary"
            mt={2}
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Verified!{" "}
            <span
              role="img"
              aria-label="verified"
              style={{ marginLeft: "8px" }}
            >
              📞✅
            </span>
          </Typography>
        )}
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
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
        <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
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
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          disabled={!isFormValid}
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "#0035B3",
            color: "white",
            "&:hover": {
              bgcolor: "#002188",
            },
            py: 1.5,
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
          }}
        >
          Submit
        </Button>
      </Box>
      <div id="recaptcha-container"></div>
    </ThemeProvider>
  );
};

export default React.memo(StandaloneForm);
