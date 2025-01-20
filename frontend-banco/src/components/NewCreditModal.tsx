import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { Credit, NewCredit } from 'app/data/interfaces';

interface EditCreditModalProps {
  isOpen: boolean;
  formMode: 'new' | 'edit';
  onClose: () => void;
  onSubmit: (newCredit: NewCredit) => void;
  creditToEdit: Credit | null;
}

const EditCreditModal: React.FC<EditCreditModalProps> = ({ isOpen, onClose, onSubmit, creditToEdit, formMode }) => {
  const [newCredit, setNewCredit] = useState<NewCredit>({
    creditoId: '',
    clienteId: '',
    fechaDesembolso: '',
    monto: 0,
    plazoMeses: 0,
    tasaInteres: 0,
    estado: 'Activo',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCredit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newCredit);
    onClose();
  };

  useEffect(() => {
    if (creditToEdit) {
      setNewCredit({
        ...creditToEdit,
        fechaDesembolso: new Date(creditToEdit.fechaDesembolso).toISOString().split('T')[0],
      });
    } else {
      setNewCredit({
        creditoId: '',
        clienteId: '',
        fechaDesembolso: '',
        monto: 0,
        plazoMeses: 0,
        tasaInteres: 0,
        estado: 'Activo',
      });
    }
  }, [creditToEdit, isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title" >
      <DialogTitle id="form-dialog-title">
        {formMode === 'new' ? 'Crear Nuevo Crédito' : `Editar Crédito ${creditToEdit?.creditoId}`}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clienteId"
            name="clienteId"
            label="Id. Cliente"
            select
            fullWidth
            value={newCredit.clienteId}
            onChange={handleChange}
          >
            <MenuItem value="CLI001">CLI001</MenuItem>
            <MenuItem value="CLI002">CLI002</MenuItem>
            <MenuItem value="CLI003">CLI003</MenuItem>
            <MenuItem value="CLI004">CLI004</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="fechaDesembolso"
            name="fechaDesembolso"
            label="Fecha Desembolso"
            type="date"
            fullWidth
            value={newCredit.fechaDesembolso}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="monto"
            name="monto"
            label="Monto"
            type="number"
            fullWidth
            value={newCredit.monto}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="plazoMeses"
            name="plazoMeses"
            label="Meses"
            type="number"
            fullWidth
            value={newCredit.plazoMeses}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="tasaInteres"
            name="tasaInteres"
            label="Interés"
            type="number"
            fullWidth
            value={newCredit.tasaInteres}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="estado"
            name="estado"
            label="Estado"
            select
            fullWidth
            value={newCredit.estado}
            onChange={handleChange}
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
            <Button variant="contained" type="submit" color="primary">
            {formMode === 'new' ? 'Crear' : 'Guardar'}
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCreditModal;

