import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TwitterIcon from '@material-ui/icons/Twitter';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import LoopIcon from '@material-ui/icons/Loop';
import PersonIcon from '@material-ui/icons/Person';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Card, CardContent, Switch} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import './Dashboard.css';
import {LatestLaunch, NextLaunch} from "./Widgets/SpaceX";
import UserRepo from "./Widgets/GitHub";
import Temperature from "./Widgets/Temperarture";
import Weather from "./Widgets/Weather";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const DashboardAppBar = ({classes, toggleDrawer, drawerStatus}) => {
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerStatus,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    className={clsx(classes.menuButton, drawerStatus && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    )
}


const useStyless = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const WidgetSettings = () => {
    const classes = useStyless();
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem nodeId="1" label="Weather" icon={<WbSunnyIcon color={"primary"}/>}>
                <TreeItem nodeId={"4"} label="Current Weather"/>
            </TreeItem>
            <TreeItem nodeId="2" label="Twitter" icon={<TwitterIcon color={"primary"}/>}>
                <Card>
                    <CardContent>
                        Send Tweet
                        <Button className="setting-button" variant={"contained"}><SettingsIcon color={"primary"}/></Button>
                        <Switch />
                    </CardContent>
                </Card>
                <TreeItem nodeId={"6"} label="See Feed"/>
            </TreeItem>
            <TreeItem nodeId="3" label="SpaceX"
                      icon={<Brightness3Icon color={"primary"}/>}
                      endIcon={<LoopIcon color={"primary"}/>}>
                <TreeItem nodeId={"7"} label="Latest Launch"/>
                <TreeItem nodeId={"8"} label="Next Launch"/>
            </TreeItem>
        </TreeView>
    )
}

const Dashboard = ({user}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DashboardAppBar classes={classes} toggleDrawer={toggleDrawer} drawerStatus={open}/>
            <Drawer className={classes.drawer} variant="persistent" anchor="left"
                open={open} classes={{paper: classes.drawerPaper}}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <WidgetSettings/>
                <Divider />
                <List><ListItem button key='Profile'>
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={'Profile'} />
                </ListItem></List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <NextLaunch/>
                <LatestLaunch/>
                <Temperature location={"Paris"}/>
                <Weather location={"Paris"}/>
            </main>
        </div>
    );
}

export default Dashboard;