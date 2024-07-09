
import { useAuth } from "../AuthContext"
import '../App.css'
import LogoutButton from '../components/LogoutButton';

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      {currentUser && (
        <div>
          <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
          <LogoutButton></LogoutButton>
        </div>
      )}
    </>
  )
}

export default Dashboard
