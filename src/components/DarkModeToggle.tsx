import * as React from 'react';
import { IconButton, Box, Tooltip, Menu, MenuItem, Grow } from '@material-ui/core';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Brightness2, Brightness7, ArrowDropDown } from '@material-ui/icons';

export interface DarkModeToggleProps {}

const DarkModeToggle: React.FC<DarkModeToggleProps> = props => {
  const { dark, set, isSystem } = useDarkMode();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
  }, []);
  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const resetToSystem = React.useCallback(() => {
    set(undefined);
    setAnchorEl(null);
  }, []);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Tooltip title={`${dark ? 'Light' : 'Dark'} Mode`}>
        <IconButton onClick={() => set(!dark)}>
          {dark ? <Brightness7 /> : <Brightness2 />}
        </IconButton>
      </Tooltip>
      <Grow in={!isSystem}>
        <div>
          <IconButton onClick={handleMenuClick} size="small">
            <ArrowDropDown fontSize="small" />
          </IconButton>
          <Menu id="dark-mode-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
            <MenuItem onClick={resetToSystem}>Use system theme</MenuItem>
          </Menu>
        </div>
      </Grow>
    </Box>
  );
};

export default DarkModeToggle;
