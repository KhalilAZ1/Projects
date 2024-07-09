import React from 'react'
import { useHistory } from 'history';

function Home() {
  const history = useHistory();

  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      <button onClick={() => history.push('/about')}>Go to About page</button>
    </div>
  );
}

export default Home;

