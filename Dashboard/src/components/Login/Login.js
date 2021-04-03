import {useState} from 'react';
import {AppBar, Tabs, Tab, Box} from '@material-ui/core';
import PropTypes from 'prop-types';

import "./Login.css"
import ConnexionForm from "./ConnexionForm";

import {auth} from '../../logic/firebase';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index}
             id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (<Box p={3}>{children}</Box>)}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Connexion = ({setUser}) => {
    const [value, setValue] = useState(0);

    return (
        <div className="LoginElems">
            <AppBar position="static">
                <Tabs value={value} onChange={(ev, value) => setValue(value)}>
                    <Tab label="Sign In" {...a11yProps(0)} />
                    <Tab label="Create Account" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ConnexionForm setUser={setUser} what="sign in" authMethod={auth.signInWithEmailAndPassword}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ConnexionForm setUser={setUser} what="create account" authMethod={auth.createUserWithEmailAndPassword}/>
            </TabPanel>
        </div>
    );
}

export default Connexion;