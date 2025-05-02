import { useState } from 'react';
import { 
  Typography, 
  Button, 
  Box,
  Card,
  CardContent,
  Chip,
  Grid
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CardTask = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: "#2d3748", 
        color: "white",
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }
      }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
            mb: 2
          }}>
            {task.title || task.taskTitle}
          </Typography>
          
          <Box sx={{ mt: 1, mb: 2 }}>
            <Chip 
              label={task.isCompleted ? 'Completada' : 'Pendiente'} 
              color={task.isCompleted ? 'success' : 'warning'} 
              size="small"
            />
          </Box>
          
          <Typography variant="body2" sx={{ 
            mb: 2, 
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {task.description || task.taskDescription}
          </Typography>
          
          <Typography variant="caption" display="block" sx={{ mb: 2, color: 'gray' }}>
            Creada: {formatDate(task.createdAt || task.creationDate)}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            <Button 
              variant="contained" 
              color="info" 
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(task)}
              sx={{ flex: 1, mr: 1 }}
            >
              Editar
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(task.id || task.taskId)}
              sx={{ flex: 1 }}
            >
              Eliminar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardTask; 