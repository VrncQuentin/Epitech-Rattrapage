import {Route, Redirect} from "react-router-dom";
import {useAuth} from "../Auth/context";

export default function GuestRoute({component: Component, ...rest}) {
    const {user} = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return (user === null ? <Component {...props}/> : <Redirect to="/"/>)
            }}>
        </Route>
    )
}