import { useEffect, useState, useContext } from "react";
import TasksManagerContext from "../context/TasksManagerProvider";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Button, 
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
  Chip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import TaskForm from "../components/TaskForm";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { tasks, getTasksAllTasks, deleteTask } = useContext(TasksManagerContext);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  // Estado para filtros
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: ""
  });
  
  // Estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);
  
  // Estado para tareas filtradas
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);
  
  // Efecto para aplicar filtros cuando cambian las tareas o los filtros
  useEffect(() => {
    if (!tasks) return;
    
    // Aplicar filtros
    let result = [...tasks];
    
    // Filtro por estado
    if (filters.status !== "all") {
      const isCompleted = filters.status === "completed";
      result = result.filter(task => task.isCompleted === isCompleted);
    }
    
    // Filtro por fecha desde
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      result = result.filter(task => {
        const taskDate = new Date(task.createdAt || task.creationDate);
        return taskDate >= dateFrom;
      });
    }
    
    // Filtro por fecha hasta
    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo);
      dateTo.setHours(23, 59, 59);  // Incluir todo el día
      result = result.filter(task => {
        const taskDate = new Date(task.createdAt || task.creationDate);
        return taskDate <= dateTo;
      });
    }
    
    setFilteredTasks(result);
  }, [tasks, filters]);

  const loadTasks = async () => {
    setLoading(true);
    await getTasksAllTasks();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      await deleteTask(id);
    }
  };

  const handleOpenNewTask = () => {
    setCurrentTask(null);
    setOpenForm(true);
  };

  const handleOpenEditTask = (task) => {
    setCurrentTask(task);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    loadTasks(); // Recargar tareas después de cerrar el formulario
  };
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const clearFilters = () => {
    setFilters({
      status: "all",
      dateFrom: "",
      dateTo: ""
    });
  };

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
  
  // Renderiza una tarjeta para mostrar una tarea en dispositivos móviles
  const renderTaskCard = (task) => (
    <Card key={task.id || task.taskId} sx={{ mb: 2, backgroundColor: "#2d3748", color: "white" }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {task.title || task.taskTitle}
        </Typography>
        
        <Box sx={{ mt: 1, mb: 2 }}>
          <Chip 
            label={task.isCompleted ? 'Completada' : 'Pendiente'} 
            color={task.isCompleted ? 'success' : 'warning'} 
            size="small"
          />
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          {task.description || task.taskDescription}
        </Typography>
        
        <Typography variant="caption" display="block" sx={{ mb: 2, color: 'gray' }}>
          Creada: {formatDate(task.createdAt || task.creationDate)}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            variant="contained" 
            color="info" 
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleOpenEditTask(task)}
            sx={{ flex: 1, mr: 1 }}
          >
            Editar
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(task.id || task.taskId)}
            sx={{ flex: 1 }}
          >
            Eliminar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: "white" }}>
          Tareas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title={showFilters ? "Ocultar filtros" : "Mostrar filtros"}>
            <IconButton 
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? "secondary" : "primary"}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Actualizar">
            <IconButton 
              onClick={loadTasks}
              color="primary"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenNewTask}
          >
            Nueva Tarea
          </Button>
        </Box>
      </Box>
      
      {/* Sección de filtros */}
      {showFilters && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: "#2d3748" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "white" }}>Filtros</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-filter-label" sx={{ color: "white" }}>Estado</InputLabel>
                <Select
                  labelId="status-filter-label"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Estado"
                  sx={{ color: "white", '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' } }}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="pending">Pendientes</MenuItem>
                  <MenuItem value="completed">Completadas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Desde fecha"
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  color: "white", 
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '.MuiInputBase-input': { color: 'white' },
                  '.MuiInputLabel-root': { color: 'white' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Hasta fecha"
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  color: "white", 
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '.MuiInputBase-input': { color: 'white' },
                  '.MuiInputLabel-root': { color: 'white' }
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={clearFilters} sx={{ color: 'white', borderColor: 'white' }}>
              Limpiar Filtros
            </Button>
          </Box>
        </Paper>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredTasks && filteredTasks.length > 0 ? (
        isMobile ? (
          // Vista de tarjetas para móviles
          <Box>
            {filteredTasks.map(task => renderTaskCard(task))}
          </Box>
        ) : (
          // Vista de tabla para pantallas más grandes
          <TableContainer component={Paper} sx={{ backgroundColor: "#2d3748", color: "white" }}>
            <Table sx={{ minWidth: 650 }} aria-label="tasks table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1a202c" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Título</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descripción</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha de Creación</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id || task.taskId}>
                    <TableCell sx={{ color: "white" }}>{task.title || task.taskTitle}</TableCell>
                    <TableCell sx={{ color: "white" }}>{task.description || task.taskDescription}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <Chip 
                        label={task.isCompleted ? 'Completada' : 'Pendiente'} 
                        color={task.isCompleted ? 'success' : 'warning'} 
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{formatDate(task.createdAt || task.creationDate)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained" 
                          color="info" 
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenEditTask(task)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error" 
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(task.id || task.taskId)}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : (
        <Paper sx={{ p: 4, backgroundColor: "#2d3748", color: "white", textAlign: "center" }}>
          <Typography variant="h6">
            {tasks && tasks.length > 0 
              ? "No se encontraron tareas con los filtros aplicados" 
              : "No hay tareas disponibles. ¡Crea una nueva tarea!"}
          </Typography>
        </Paper>
      )}

      {/* Modal para crear/editar tareas */}
      <TaskForm 
        open={openForm} 
        handleClose={handleCloseForm} 
        task={currentTask}
      />
    </div>
  );
}
