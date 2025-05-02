import { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import TasksManagerContext from '../context/TasksManagerProvider';

const Notification = () => {
  const { notification, closeNotification } = useContext(TasksManagerContext);
  const { open, message, type, duration } = notification;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={closeNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={closeNotification} 
        severity={type} 
        variant="filled"
        sx={{ 
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification; 