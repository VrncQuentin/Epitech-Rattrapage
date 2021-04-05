import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GitHubIcon from '@material-ui/icons/GitHub';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import LoopIcon from '@material-ui/icons/Loop';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import {LatestLaunch, NextLaunch} from "./Widgets/SpaceX";
import Temperature from "./Widgets/Temperarture";
import Weather from "./Widgets/Weather";
import GitHub from "./Widgets/GitHub";

import {useAuth} from "../Auth/context";
import * as back from '../APIs/back'
import {Button, Card, Form} from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const drawerWidth = 280;
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

const WeatherSettings = ({used, twu, wt, twt, ww, tww}) => {
    const cityTempRef = useRef();
    const cityWeatherRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (cityTempRef.current.value !== '') {
            twt(cityTempRef.current.value)
        }
        if (cityWeatherRef.current.value !== '') {
            tww(cityWeatherRef.current.value)
        }
    }

    return (
        <TreeItem nodeId='1' label='Weather' icon={<WbSunnyIcon/>}>
            <Card>
                <BootstrapSwitchButton checked={used} onChange={twu}/>
                {used &&
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="city-temp">
                        <Form.Label>City Temperature</Form.Label> <Button onClick={() => twt('')}>Clear</Button>
                        <Form.Control type="city" ref={cityTempRef} placeholder={wt}/>
                    </Form.Group>
                    <Form.Group id="city-weather">
                        <Form.Label>City Weather</Form.Label> <Button onClick={() => tww('')}>Clear</Button>
                        <Form.Control type="city" ref={cityWeatherRef} placeholder={ww}/>
                    </Form.Group>
                    <Button type='submit'>Use</Button>
                </Form>}
            </Card>
        </TreeItem>
    )
}

const SpaceXSettings = ({used, tsu, sl, tsl, sn, tsn}) => {
    return (
        <TreeItem nodeId='2' label='SpaceX' icon={<Brightness3Icon/>}>
            <Card>
                <BootstrapSwitchButton checked={used} onChange={tsu}/>
                {used &&
                <Form>
                    <Form.Group id="latest-flight">
                        <Form.Label>Latest Flight</Form.Label>
                        <BootstrapSwitchButton checked={sl} onChange={() => tsl()}/>
                    </Form.Group>
                    <Form.Group id="next-flight">
                        <Form.Label>Next Flight</Form.Label>
                        <BootstrapSwitchButton checked={sn} onChange={() => tsn()}/>
                    </Form.Group>
                </Form>}
            </Card>
        </TreeItem>
    )
}

const GithubSettings = ({used, tgu, gr, tgr}) => {
    const repoRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (repoRef.current.value !== '') {
            tgr(repoRef.current.value)
        }
    }

    return (
        <TreeItem nodeId='3' label='Github' icon={<GitHubIcon/>}>
            <Card>
                <BootstrapSwitchButton checked={used} onChange={tgu}/>
                {used &&
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="repo">
                        <Form.Label>Repository</Form.Label> <Button onClick={() => tgr('')}>Clear</Button>
                        <Form.Control type="repo" ref={repoRef} placeholder={gr}/>
                    </Form.Group>
                    <Button type='submit'>Use</Button>
                </Form>}
            </Card>
        </TreeItem>
    )
}

const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => setOpen(!open);

    const {user} = useAuth();
    const [wu, swu] = useState(false) // weather used
    const twu = async () => {
        try {
            await back.updateUser(user.uid, {weather: {update: {used: !wu}}})
            swu(!wu);
        } catch (e) {
            console.log(e)
        }
    }

    const [wt, swt] = useState('') // weather temp
    const twt = async (s) => {
        try {
            await back.updateUser(user.uid, {weather: {update: {temp: s}}})
            swt(s);
        } catch (e) {
            console.log(e)
        }
    }
    const [ww, sww] = useState('') // weather weather
    const tww = async (s) => {
        try {
            await back.updateUser(user.uid, {weather: {update: {weather: s}}})
            sww(s);
        } catch (e) {
            console.log(e)
        }
    }

    const [su, ssu] = useState(false) // spacex used
    const tsu = async () => {
        try {
            await back.updateUser(user.uid, {spacex: {update: {used: !su}}})
            ssu(!su);
        } catch (e) {
            console.log(e)
        }
    }
    const [sl, ssl] = useState(false) // spacex latest
    const tsl = async () => {
        try {
            await back.updateUser(user.uid, {spacex: {update: {latest: !sl}}})
            ssl(!sl);
        } catch (e) {
            console.log(e)
        }
    }
    const [sn, ssn] = useState(false) // spacex next
    const tsn = async () => {
        try {
            await back.updateUser(user.uid, {spacex: {update: {next: !sn}}})
            ssn(!sn);
        } catch (e) {
            console.log(e)
        }
    }

    const [gu, sgu] = useState(false) // github used
    const tgu = async () => {
        try {
            await back.updateUser(user.uid, {github: {update: {used: !gu}}})
            sgu(!gu);
        } catch (e) {
            console.log(e)
        }
    }
    const [gr, sgr] = useState('') // github repo
    const tgr =  async (s) => {
        try {
            await back.updateUser(user.uid, {github: {update: {repo: s}}})
            sgr(s);
        } catch (e) {
            console.log(e)
        }
    }


    const setUserInfos = (user) => {
        console.log(user)
        swu(user.weather.used)
        swt(user.weather.temp)
        sww(user.weather.weather)
        ssu(user.spacex.used)
        ssl(user.spacex.latest)
        ssn(user.spacex.next)
        sgu(user.github.used)
        sgr(user.github.repo)
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await back.getUser(user.uid)
                setUserInfos(data.data)
            } catch (e) {
                console.log('failure to find user: ' + e.message)
                try {
                    const data = await back.newUser(user.uid)
                    setUserInfos(data.data)
                } catch (e) {
                    console.log('failure to create user: ' + e.message)
                }
            }
        })();
    }, [user])

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
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}>
                    <WeatherSettings used={wu} twu={twu} wt={wt} twt={twt} ww={ww} tww={tww}/>
                    <SpaceXSettings used={su} tsu={tsu} sl={sl} tsl={tsl} sn={sn} tsn={tsn}/>
                    <GithubSettings used={gu} tgu={tgu} gr={gr} tgr={tgr}/>
                </TreeView>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {su === true && sl === true ? <LatestLaunch/> : <></>}
                {su === true && sn === true ? <NextLaunch/> : <></>}
                {wu === true && wt !== '' ? <Temperature location={wt}/> : <></>}
                {wu === true && ww !== '' ? <Weather location={ww}/> : <></>}
                {gu === true && gr !== '' ? <GitHub token={user.credential.accessToken} asked={ww}/> : <></>}
            </main>
        </div>
    );
}

export default Dashboard;