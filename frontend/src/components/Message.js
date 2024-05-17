import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(MuiAlert)(({ theme, variant }) => ({
  backgroundColor: variant === 'error' ? '#4caf50' : '#f44336', // AH set Red for error, Green for success
  color: '#fff', // AH set White text color
  borderRadius: theme.shape.borderRadius, // AH use the default border radius from the theme
  padding: theme.spacing(2), //AH Add padding for better visual appearance
}));

export default function Message({ variant, children }) {
  return (
    <StyledAlert variant={variant} severity={variant}>
      {children}
    </StyledAlert>
  );
}
