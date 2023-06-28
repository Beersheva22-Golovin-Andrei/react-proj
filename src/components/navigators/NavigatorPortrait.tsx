import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tabs, Toolbar, Typography, Tab } from "@mui/material";
import React, { ReactNode } from "react";
import rolesConfig from "../../config/roles-config.json";
import accesConfig from "../../config/acces-config.json";
import { Link } from "@mui/icons-material";

type Prop = {role:string | null};
const drawerWidth = 240;


const NavigatorPortrait: React.FC<Prop> = ({role}) => {

    const pages = rolesConfig.allPages;
    const accsessSet:number[] = accesConfig[role as 'admin'|'signedOut'| 'user'];
    const activePagesForRole: any[] = accsessSet.map(index=>pages[index]);
    const [activeValue, setValue] = React.useState(0);
    const [mobileOpen, setMobileOpen] = React.useState(false);


    
    function onChangeFn (event: any, newValue: any) {
        setValue(newValue);
    }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Tabs value={activeValue} onChange={onChangeFn}>
       <List>
        {activePagesForRole.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Tabs>
            
            
      <Divider />
    </div>
  );

  const container = undefined; // Window !== undefined ? () => Window.prototype.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
                {activePagesForRole[activeValue].name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
        1
        </Typography>
        <Typography paragraph>
        2
        </Typography>
      </Box>
    </Box>
  );
}


export default NavigatorPortrait;