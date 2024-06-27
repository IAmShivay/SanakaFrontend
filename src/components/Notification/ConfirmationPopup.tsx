import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
          maxWidth: "500px",
          margin: "auto",
        },
      }}
    >
      <DialogTitle
        style={{
          backgroundColor: "#0035b3",
          color: "#fff",
          padding: "16px 24px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          textAlign: "center",
        }}
      >
        Information Submitted
      </DialogTitle>
      <DialogContent
        style={{
          margin: "16px 0",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <Typography>
          Your information has been shared with our College Representative. They will call
          you back soon. You can also reach them at the following numbers:
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" style={{ color: "#0035b3" }}>
              <strong>+91 7477798949</strong>
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" style={{ color: "#0035b3" }}>
              <strong>+91 7477798950</strong>
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" style={{ color: "#0035b3" }}>
              <strong>+91 7063592396</strong>
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "center",
          padding: "16px 24px",
        }}
      >
        <Button
          onClick={onClose}
          style={{
            backgroundColor: "#f50057",
            color: "#fff",
            padding: "8px 24px",
            borderRadius: "20px",
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
