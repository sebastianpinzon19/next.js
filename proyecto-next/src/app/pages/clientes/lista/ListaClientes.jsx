'use client';
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";

const StyledCard = styled(Card)(({ theme }) => ({
  transform: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  height: "100%",
  minHeight: "200px",
  borderRadius: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("s")]: {
    margin: "8px",
  },
  margin: "auto",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  fontSize: "0.875rem",
  minHeight: "36px",
  textTransform: "none",
  borderRadius: "18px",
  transition: "background-color 0.3s ease",
}));

const ClienteLista = () => {
  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre_cliente: "",
    email_cliente: "",
    celular_cliente: "",
    activo_cliente: true,
  });
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/clientes');
      if (!response.ok) throw new Error('Error al obtener los clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error al cargar los clientes', 'error');
    }
  };

  const handleOpenModal = (cliente = null) => {
    setSelectedCliente(cliente);
    if (cliente) {
      setFormValues({
        nombre_cliente: cliente.nombre_cliente,
        email_cliente: cliente.email_cliente,
        celular_cliente: cliente.celular_cliente,
        activo_cliente: cliente.activo_cliente,
      });
    } else {
      setFormValues({
        nombre_cliente: "",
        email_cliente: "",
        celular_cliente: "",
        activo_cliente: true,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCliente(null);
    setFormValues({
      nombre_cliente: "",
      email_cliente: "",
      celular_cliente: "",
      activo_cliente: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const url = selectedCliente
        ? `http://localhost:2000/api/clientes/${selectedCliente.id_cliente}`
        : 'http://localhost:2000/api/clientes';
      
      const method = selectedCliente ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) throw new Error('Error en la operación');

      fetchClientes();
      handleCloseModal();
      showSnackbar(
        `Cliente ${selectedCliente ? 'actualizado' : 'creado'} exitosamente`,
        'success'
      );
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error en la operación', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:2000/api/clientes/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar');

        fetchClientes();
        showSnackbar('Cliente eliminado exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error al eliminar el cliente', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <section style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "20px",
        borderRadius: "10px",
        color: "#fff"
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          style={{ marginBottom: "30px" }}
        >
          Crear Cliente
        </Button>
        
        <Grid container spacing={4}>
          {clientes.map((cliente) => (
            <Grid item xs={12} md={6} key={cliente._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {cliente.nombre_cliente}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {cliente.email_cliente}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Celular: {cliente.celular_cliente}
                  </Typography>
                  <ActionButton onClick={() => handleOpenModal(cliente)}>
                    Editar
                  </ActionButton>
                  <ActionButton 
                    color="error"
                    onClick={() => handleDelete(cliente._id)}
                  >
                    Eliminar
                  </ActionButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </section>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {selectedCliente ? "Editar Cliente" : "Crear Cliente"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre_cliente"
            label="Nombre"
            type="text"
            fullWidth
            value={formValues.nombre_cliente}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email_cliente"
            label="Email"
            type="email"
            fullWidth
            value={formValues.email_cliente}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="celular_cliente"
            label="Teléfono"
            type="text"
            fullWidth
            value={formValues.celular_cliente}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClienteLista;
