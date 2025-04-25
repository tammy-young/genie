import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes';
import { useState } from 'react';

const ImageInfoBox = () => {
  const [infoOpen, setInfoOpen] = useState(true);
  return (
    <Collapse in={infoOpen}>
      <ThemeProvider theme={theme}>
        <Alert
          severity="info"
          color="primary"
          className='dark:!bg-primary w-fit'
          action={
            <IconButton
              aria-label="close"
              color='inherit'
              size="small"
              onClick={() => {
                setInfoOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Images aren't shown due to copyright but can be viewed on Stardoll's CDN.
        </Alert>
      </ThemeProvider>
    </Collapse>
  )
}

export default ImageInfoBox;
