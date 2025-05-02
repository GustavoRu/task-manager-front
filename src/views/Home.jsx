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
  Container,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import TaskFormModal from "../components/TaskFormModal";
import CardTask from "../components/CardTask";
import ConfirmDialog from "../components/ConfirmDialog";
import TaskFilters from "../components/TaskFilters";

export default function Home() {
  const theme = useTheme();
  const { tasks, getTasksAllTasks, getMyTasks, deleteTask, user } = useContext(TasksManagerContext);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskView, setTaskView] = useState("all"); // Estado para manejar la vista (all / my)
  
  // Estado para el diálogo de confirmación
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    taskId: null,
    taskTitle: ''
  });
  
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
  }, [taskView]);
  
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
    if (taskView === "my") {
      await getMyTasks();
    } else {
      await getTasksAllTasks();
    }
    setLoading(false);
  };

  const handleOpenDeleteConfirm = (id, title) => {
    setConfirmDialog({
      open: true,
      taskId: id,
      taskTitle: title
    });
  };

  const handleCloseDeleteConfirm = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false
    });
  };

  const handleDelete = async () => {
    const { taskId } = confirmDialog;
    if (taskId) {
      const success = await deleteTask(taskId);
      if (success) {
        loadTasks(); // Recargar tareas solo después de eliminar exitosamente
      }
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

  const handleCloseForm = (taskSaved = false) => {
    setOpenForm(false);
    if (taskSaved) {
      loadTasks(); // Solo recargar tareas si se guardó una tarea
    }
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
  
  const handleTaskViewChange = (event, newView) => {
    if (newView !== null) {
      setTaskView(newView);
    }
  };

  // Estilo común para los botones de icono
  const iconButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: "white" }}>
          Tareas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={taskView}
            exclusive
            onChange={handleTaskViewChange}
            aria-label="Vista de tareas"
            sx={{
              '& .MuiToggleButton-root': {
                ...iconButtonStyle,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(99, 102, 241, 0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                  }
                }
              }
            }}
          >
            <ToggleButton value="all" aria-label="Todas las tareas">
              <Tooltip title="Todas las tareas">
                <PeopleIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="my" aria-label="Mis tareas">
              <Tooltip title="Mis tareas">
                <PersonIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Tooltip title={showFilters ? "Ocultar filtros" : "Mostrar filtros"}>
            <IconButton 
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? "secondary" : "primary"}
              sx={iconButtonStyle}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Actualizar">
            <IconButton 
              onClick={loadTasks}
              color="primary"
              sx={iconButtonStyle}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Nueva tarea">
            <IconButton 
              onClick={handleOpenNewTask}
              color="primary"
              sx={iconButtonStyle}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Sección de filtros */}
      {showFilters && (
        <TaskFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
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
              onDelete={() => handleOpenDeleteConfirm(task.id || task.taskId, task.title || task.taskTitle)}
            />
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, backgroundColor: "#2d3748", color: "white", textAlign: "center" }}>
          <Typography variant="h6">
            {tasks && tasks.length > 0 
              ? "No se encontraron tareas con los filtros aplicados" 
              : taskView === "my" 
                ? "No tienes tareas asignadas. ¡Crea una nueva tarea!" 
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

      {/* Dialog de confirmación para eliminar */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleDelete}
        title="Eliminar Tarea"
        message={`¿Estás seguro de eliminar la tarea "${confirmDialog.taskTitle}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="error"
      />
    </Container>
  );
}
