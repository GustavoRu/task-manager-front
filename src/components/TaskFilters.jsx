import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Paper,
  Box
} from "@mui/material";

const TaskFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  return (
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
              onChange={onFilterChange}
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
            onChange={onFilterChange}
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
            onChange={onFilterChange}
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
        <Button variant="outlined" onClick={onClearFilters} sx={{ color: 'white', borderColor: 'white' }}>
          Limpiar Filtros
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskFilters; 