import { Redirect, Route } from 'react-router-dom'

interface Props {
  path: string
  component: React.FC
}

const PrivateRoute: React.FC<Props> = (props) => {
  return localStorage.getItem('authToken') ? (
    //TODO: Send a request to the server to check if the authToken is valid for the selected user
    <Route exact path={props.path} component={props.component} />
  ) : (
    <Redirect to='/login' />
  )
}

export default PrivateRoute
