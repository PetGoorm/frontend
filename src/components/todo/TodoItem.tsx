import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Stack,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  FormControlLabel,
} from '@mui/material';

// components
import Iconify from '../iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 


TaskItem.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    task: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  };
  
  export default function TaskItem({ task, checked, onChange }) {
    const [open, setOpen] = useState(null);
  
    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };
  
    const handleEdit = () => {
      handleCloseMenu();
      console.log('EDIT', task.id);
    };
  
    const handleDelete = () => {
      handleCloseMenu();
      console.log('DELETE', task.id);
    };
  
    return (
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.title}
          sx={{ flexGrow: 1, m: 0 }}
        />
  
        <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
  
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </Stack>
    );
  };