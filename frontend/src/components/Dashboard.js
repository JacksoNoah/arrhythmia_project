import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Display from './DefaultDisplay';
import MainList from './MainList';
import PropTypes from 'prop-types';
import PatientTable from './Patient';
import AllPatients from './AllPatients';
import {CreateUser} from './Users';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Washington State University
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: true, classes: this.props, listIndex: 0 }
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleListIndexUpdate = this.handleListIndexUpdate.bind(this)
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  };
  handleDrawerClose = () => {
    this.setState({ open: false })
  };
  handleListIndexUpdate = (index) => {
    this.setState({ listIndex: index })
  }

  render() {
    const { classes } = this.state.classes
    const listIndex = this.state.listIndex;
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    // Conditionally render center app depending on main list choice
    let centerComponent = null;
    if (listIndex === 0) {
      centerComponent = <Display />
    } else if (listIndex === 1) {
      centerComponent = <AllPatients />
    } else if (listIndex === 2) {
      centerComponent = <CreateUser />
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            {/*title on top of dash*/}
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Visualizing Arrhythmia: 420 Capstone Project
            </Typography>
            <IconButton color="inherit">
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {/* <List>{mainListItems}</List> */}
          <MainList listIndex={this.handleListIndexUpdate}></MainList>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* Render center app component depending on main list */}
          {centerComponent}
          <Copyright />
        </main>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(useStyles)(Dashboard)