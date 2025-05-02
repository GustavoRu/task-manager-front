import { useEffect, useState, useContext } from "react";
import TasksManagerContext from "../context/TasksManagerProvider";
import { 
  Typography, 
  Button, 
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  useTheme,
  Paper,
  Container
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import TaskFormModal from "../components/TaskFormModal";
import CardTask from "../components/CardTask";

export default function Home() {
  const theme = useTheme();
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
        <Grid container spacing={3}>
          {filteredTasks.map(task => (
            <CardTask 
              key={task.id || task.taskId}
              task={task}
              onEdit={handleOpenEditTask}
              onDelete={handleDelete}
            />
          ))}
        </Grid>
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
      <TaskFormModal 
        open={openForm} 
        handleClose={handleCloseForm} 
        task={currentTask}
      />
    </Container>
  );
}
