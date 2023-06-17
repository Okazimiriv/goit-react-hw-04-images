import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    setValue(target.value.toLowerCase());
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return toast.warn('Please enter key words for search', {
        icon: false,
      });
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormBtn type="submit">
          <ImSearch size="24" />
        </SearchFormBtn>

        <SearchFormInput
          value={value}
          onChange={handleChange}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          name="search"
          // required
          autoFocus
        />
      </SearchForm>
    </Header>
  );
}

PropTypes.Searchbar = {
  onSubmit: PropTypes.func.isRequired,
};

// export default class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleChange = ({ target }) => {
//     this.setState({ value: target.value.toLowerCase() });
//   };

//   onFormSubmit = event => {
//     event.preventDefault();

//     if (this.state.value.trim() === '') {
//       return toast.warn('Please enter key words for search', {
//         icon: false,
//       });
//     }

//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <Header>
//         <SearchForm onSubmit={this.onFormSubmit}>
//           <SearchFormBtn type="submit">
//             <ImSearch size="24" />
//           </SearchFormBtn>

//           <SearchFormInput
//             value={value}
//             onChange={this.handleChange}
//             type="text"
//             autocomplete="off"
//             placeholder="Search images and photos"
//             name="search"
//             // required
//             autoFocus
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }
