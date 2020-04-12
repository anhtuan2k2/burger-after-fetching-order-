import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spiner from '../../../components/UI/Spiner/Spiner';
import classes from './ContactData.css';
import axios from '../../../hoc/axios-order';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Tom Rider ',
        address: {
          street: '501 street china',
          zipcode: '3121',
        },
        email: 'Tomrider101@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('./orders.json', order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/'); // dong nay se dua ve lai trang sau khi click vao order o phan form
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Your Name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Your Mail'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Street'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='Postal Code'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spiner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
