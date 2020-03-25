import { useState } from 'react';

function useForm (callback) {
  const [values, setValues] = useState({});

  const handleSubmit = e => {
    if (e) e.preventDefault();
    console.log('e in submit',e.target);
    callback(values);
  };

  const handleChange = e => {
    e.persist();
    setValues(values => {
      const { name, value } = e.target;
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const handleTextInput = {
    arbitrarykey: 'arbitraryValue',
    onChange: function (e) {
      e.persist();
      setValues(values => {
        console.log('e.target',e.target);
        const { name, value } = e.target;
        return {
          ...values,
          [name]: value,
        };
      });
    }
  };

  return [
    handleSubmit,
    handleChange,
    handleTextInput,
    values,
  ]
}

export default useForm;