import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import * as ImageService from '../service/apiService';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import { ErrorMessage } from './ErorrMessage';
import { Modal }  from './Modal/Modal';

import { Container } from './App.styled';
import { Text } from './Text/Text.styled';
import { ButtonLoadMore } from './Button/Button.styled';
import { Loader } from './Loader/Loader.styled';

const PER_PAGE = 12;

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,    
    isShowBtn: false,
    isEmpty: false,
    showModal: false,
    error: null,
    modalImage: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
     if (prevState.images !== images) {
      setTimeout(() => {
        window.scrollBy({
          top: 500 * 3,
          behavior: 'smooth',
        });
      }, 500);
    }
  }

  getImages = (query, page) => {
    this.setState({ isLoading: true, error: null });

    ImageService.getImages(query, page)
      .then(response => {
        const { hits, totalHits } = response;
        console.log(response);
       
        if (!hits.length) {
          this.setState({
            isEmpty: true,
            showMoreBtn: false,
          });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isShowBtn: 1 < Math.ceil(totalHits / PER_PAGE),
          // isShowBtn: true,
        }));
      })
      .catch((error) => {
          this.setState({ error: 'Oops! Something went wrong! Try reloading the page!' });
        })
      .finally(() => this.setState({ isLoading: false }));
  };

  onSearchSubmit = value => {
    // console.log(value);
    this.setState({
      query: value,
      images: [],
      page: 1,
      showModal: false,
      isShowBtn: false,
      isEmpty: false,
      error: null,
      modalImage: ''
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

 onImgClick = evt => {
    this.setState({ showModal: true });
    this.setState({ modalImage: evt.target.dataset.bigimg });
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  
  render() {
    const { images, isLoading, isEmpty, isShowBtn, error, showModal, modalImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ToastContainer autoClose={3000} theme="colored" style={{ top: "1px" }} />
        <ImageGallery images={images} onImgClick={this.onImgClick} />
        {isEmpty && <Text>Sorry. There are no images...😕 </Text>}
        {/* {isLoading && <Text>Loading ... </Text>} */}        
        {isLoading && (<Loader>
          <ThreeDots color="#00BFFF" />
        </Loader>)}      
        {isShowBtn && (
          <ButtonLoadMore type="button" onClick={this.onLoadMore}>
            Load more
          </ButtonLoadMore>
        )}
        {showModal && (
          <Modal onClose={this.onCloseModal} bigImage={modalImage}></Modal>
        )}
        {error && <ErrorMessage>{(error)}</ErrorMessage>}
      </Container>
    );
  }
}
