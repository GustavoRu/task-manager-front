import { useState, useEffect, useContext } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Box
} from '@mui/material';
import TasksManagerContext from '../context/TasksManagerProvider';

export default function TaskFormModal({ open, handleClose, task = null }) {
  const { addTask, updateTask } = useContext(TasksManagerContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false
  });
  const [errors, setErrors] = useState({});

  // Si hay una tarea pasada como prop, se trata de una edición
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || task.taskTitle || '',
        description: task.description || task.taskDescription || '',
        isCompleted: task.isCompleted || false
      });
    } else {
      // Resetear el formulario si es una nueva tarea
      setFormData({
        title: '',
        description: '',
        isCompleted: false
      });
    }
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      if (task) {
        // Actualizar tarea existente
        await updateTask(task.id || task.taskId, formData);
      } else {
        // Crear nueva tarea
        await addTask(formData);
      }
      // Pasar true para indicar que se guardó correctamente
      handleClose(true);
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      // Pasar false en caso de error
      handleClose(false);
    }
  };

  const handleCancel = () => {
    // Cerrar sin guardar cambios
    handleClose(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{task ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isCompleted}
                onChange={handleChange}
                name="isCompleted"
                color="primary"
              />
            }
            label="Tarea completada"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {task ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 