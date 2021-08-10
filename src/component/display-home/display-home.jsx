import React from 'react';
import '../display-home/display-home.scss';
import updateIcon from '../../images/icons/create-black-18dp.svg';
import deleteIcon from '../../images/icons/delete-black-18dp.svg';
import AddressBookService from '../../service/adddressbookService';
import {withRouter} from 'react-router-dom';
const Display = (props) => {
    const update = (id) => {
        props.history.push(`/form/${id}`);
    }
    return(
        <table id ="display" className="table">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th id="address-number">Phone Number</th>
                    <th id='address-title'>Address</th>
                    <th>State</th>
                    <th>City</th>
                    <th id='address-zipcode'>Zip Code</th>
                    <th></th>
                </tr>
                    {
                    props.addressbookData.map((person) => (
                    <tr key={person.id}>
                        <td id='name'>{person.name}</td>
                        <td id='number'>{person.phoneNumber}</td>
                        <td id='address'>{person.address}</td>
                        <td id='state'>{person.state}</td>
                        <td id='city'>{person.city}</td>
                        <td id='zipCode'>{person.pinCode}</td>
                        <td ><img src={deleteIcon} onClick={() => remove(person.id)} alt="delete" />
                        <img src={updateIcon} onClick={() => update(person.id)} alt="update" />
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}
const remove=(id)=>{
    new AddressBookService().deletePerson(id)
    .then(response=>{
        this.setState({
            addressbookData:response.data
        })
        console.log("Data successfully deleted from addressbook")
    })
    .catch(error=>{
        console.log("Error in deleting data by id"+JSON.stringify(error.data));
    })
    window.location.reload();
}
export default withRouter(Display) 