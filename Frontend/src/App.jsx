import { Form, Password } from './components'
import { useState } from 'react'

const App = () => {
  const [triggerPasswordUpdate, setTriggerPasswordUpdate] = useState(false);

  const handleAddPassword = () => {
    setTriggerPasswordUpdate(!triggerPasswordUpdate); // Toggle state to trigger re-render in Password component
  };
  return (
    <section className='container'>
      <Form onAddPassword={handleAddPassword} />
      <Password key={triggerPasswordUpdate} /> {/* Key is updated to force re-render */}
    </section>
  )
}

export default App
