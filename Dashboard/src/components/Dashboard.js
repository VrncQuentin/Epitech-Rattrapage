import Weather from "./Widgets/Weather";

function Dashboard() {
    return (
        <div className="dashboard">
            <Weather location="Paris"/>
        </div>
    )
}

export default Dashboard;