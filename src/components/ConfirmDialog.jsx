import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirmar", 
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning" // warning, error, info
}) => {
  
  // Definir colores según el tipo
  const getColor = () => {
    switch(type) {
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#ff9800';
    }
  };
  
  const color = getColor();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderTop: `4px solid ${color}`,
          borderRadius: '4px',
          backgroundColor: '#2d3748',
          color: 'white'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon sx={{ color }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description"
          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: 'white'
            }
          }}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={() => {
            onConfirm();
            onClose();
          }} 
          variant="contained"
          color={type}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 