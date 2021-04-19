import {DbUserProvider} from "./Context";
import Dashboard from "./Dashboard";

const DashboardWithDbUser = () => {
    return (
        <DbUserProvider>
            <Dashboard/>
        </DbUserProvider>
    )
}

export default DashboardWithDbUser;