'use client'
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
} from '@mui/material';
import styles from './ListaProveedores.module.css';

// Estilo para las tarjetas dinámicas
const StyleCard = ({ children }) => (
  <Card className={styles.StyleCard}>
    <CardContent>{children}</CardContent>
  </Card>
);

// Estilo para los botones de acción personalizados
const ActionButton = ({ children, className, ...props }) => (
  <Button className={`${styles.ActionButton} ${className}`} {...props}>
    {children}
  </Button>
);

const ActivatedButton = (props) => (
  <ActionButton className={styles.ActivatedButton} {...props} />
);

const DeactivatedButton = (props) => (
  <ActionButton className={styles.DeactivatedButton} {...props} />
);

const DeleteButton = (props) => (
  <ActionButton className={styles.DeleteButton} {...props} />
);

const UpdateButton = (props) => (
  <ActionButton className={styles.UpdateButton} {...props} />
);

const ListaProveedores = () => {
  const [proveedores, setproveedores] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre_proveedor: "",
    email_proveedor: "",
    celular_proveedor: "",
    activo_proveedor: true,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionType, setActionType] = useState<'create' | 'update'>('create');

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const respuesta = await fetch('http://localhost:2000/api/proveedores');
      if (!respuesta.ok) throw new Error('Error al obtener todos los proveedores');
      const data = await respuesta.json();
      setproveedores(data);
    } catch (error) {
      console.error('Error al obtener los proveedores: ', error);
      setErrorMessage('Error al obtener los proveedores');
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = (proveedor = null) => {
    if (proveedor) {
      setFormValues({
        nombre_proveedor: proveedor.nombre_proveedor,
        email_proveedor: proveedor.email_proveedor,
        celular_proveedor: proveedor.celular_proveedor,
        activo_proveedor: proveedor.activo_proveedor,
      });
      setActionType('update');
    } else {
      setFormValues({
        nombre_proveedor: "",
        email_proveedor: "",
        celular_proveedor: "",
        activo_proveedor: true,
      });
      setActionType('create');
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:2000/api/proveedores/delete/${id}`, { method: 'DELETE' });
      fetchProveedores();
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <section style={{
        background: 'linear-gradient(135deg, #6a1cb 0%, #2575fc 100%)',
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
          Crear Proveedor
        </Button>
      </section>
      <Grid container spacing={1}>
        {proveedores.map((proveedor) => (
          <Grid item xs={12} md={6} key={proveedor._id}>
            <StyleCard>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {proveedor.nombre_proveedor}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {proveedor.email_proveedor}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Celular: {proveedor.celular_proveedor}
                </Typography>
                <Typography variant="body2"
                  style={{ color: proveedor.active_proveedor ? "#4caf50" : "#f44336" }}
                  fontWeight="bold"
                >
                  {proveedor.active_proveedor ? "Activo" : "Desactivado"}
                </Typography>
                <Button onClick={() => handleOpenModal(proveedor)}>Actualizar</Button>
                <UpdateButton />
                <DeactivatedButton onClick={() => handleDeactivate(proveedor._id)}>Desactivar</DeactivatedButton>
                <ActivatedButton onClick={() => handleActivate(proveedor._id)}>Activar</ActivatedButton>
                <DeleteButton onClick={() => handleDelete(proveedor._id)}>Eliminar</DeleteButton>
              </CardContent>
            </StyleCard>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{actionType === 'create' ? 'Crear Proveedor' : 'Actualizar Proveedor'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre_proveedor"
            value={formValues.nombre_proveedor}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email_proveedor"
            value={formValues.email_proveedor}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Celular"
            name="celular_proveedor"
            value={formValues.celular_proveedor}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveProveedor} color="primary">
            {actionType === 'create' ? 'Crear' : 'Actualizar'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={errorMessage ? "error" : "success"} onClose={handleCloseSnackbar}>
          {errorMessage || "Operación exitosa"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaProveedores;
