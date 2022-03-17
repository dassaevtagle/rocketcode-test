import PropTypes from 'prop-types'

import './ResetButton.scss'

const ResetButton = ({reset}) => {
  return (
    <button className='reset-button' onClick={reset}>
      Reiniciar
    </button>
  )
}

ResetButton.propTypes = {
  reset: PropTypes.func.isRequired
}

export default ResetButton