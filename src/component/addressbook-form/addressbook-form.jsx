import React from 'react';
import logo from "C:\\Users\\ayuanshi\\React\\addressbook\\src\\images\\images\\logo.png";
import '../addressbook-form/addressbook-form.scss';
import cancel from '../../images/icons/cancel.png';
import AddressBookService from '../../service/adddressbookService';
import {Link,withRouter,useParams} from 'react-router-dom';
class AddressBookForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            number:"",
            address:"",
            State:"",
            city:"",
            zipCode:"",
            errorMessage:false,
            textError:"",
            numberError:"",
            isUpdate:false
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    handleNameChange=(e)=>{
        this.setState({
            name:e.target.value
        });
        let regex=RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if(!regex.test(e.target.value)){
            this.setState({
                textError:"Invalid Name Format",
                errorMessage:true
        })
        }
        else{
            this.setState({textError:""});
        }
    }
    handleNumberChange=(e)=>{
        this.setState({
            number:e.target.value
        });
        let regex=RegExp("\\d{2}\\d{10}");
        if(!regex.test(e.target.value)){
            this.setState({
                numberError:"Invalid Name Format",
                errorMessage:true
        })
        }
        else{
            this.setState({numberError:""});
        }
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        if(id !== undefined && id !==''){
            console.log(id);
            new AddressBookService().getPersonById(id)
            .then(responseText => {
                let responseData=responseText.data;
                this.setForm(responseData.data);
                console.log(console.log("Data retrieved"));
            }).catch(error => {
                console.log("Error while Fetching Data"+JSON.stringify(error.data));
            });
        }
    }
    save=async(e)=>{
        e.preventDefault();
        if(this.state.errorMessage===true){
            window.alert("Please enter valid data");
        }
        else{
            let personObject={
                id:this.state.id,
                name:this.state.name,
                phoneNumber:this.state.number,
                address:this.state.address,
                city:this.state.city,
                state:this.state.State,
                pinCode:this.state.zipCode
            }
            if(this.state.isUpdate){
                new AddressBookService().updatePerson(personObject,this.props.match.params.id)
                .then(response=>{
                    console.log("Data Updated Successfully");
                    window.alert("Person data Updated in AddressBook"+JSON.stringify(response.data))
                })
                .catch(error=>{
                    console.log("Error in updating data"+JSON.stringify(error.data));
                })
            }
            else{
                window.alert(personObject);
                new AddressBookService().addPerson(personObject)
                .then(response=>{
                    console.log("Data Added Successfully"+JSON.stringify(response.data));
                    window.alert(response.data);
                })
                .catch(error=>{
                    console.log("Error in Adding data"+JSON.stringify(error.data));
                })
            }
            window.location.replace('/home');
            }
    }
    setForm(personData){
        this.setState({
            id:personData.id,
            name:personData.name,
            number:personData.number,
            address:personData.address,
            city:personData.city,
            State:personData.state,
            zipCode:personData.zipCode,
            isUpdate:true
        })
    }
    reset=(e)=>{

    }

    render(){
        return(
            <div>
                <header className="header-content">
                    <div className="logo-content">
                        <img className="logo-img"src={logo} alt="addressbook logo"/>
                        <div>
                            <span className="address-text">ADDRESS</span><br></br>
                            <span className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-container">
                    <div className="form-content">
                        <div className="form-header">
                            <div className="header-text">PERSON ADDRESS FORM</div>
                            <img className="cancel-img" src={cancel} alt="cancel button"/>
                        </div>
                        <form className="form"  onReset={(e)=>{this.reset(e)}} onSubmit={(e)=>{this.save(e)}}>
                            <div className="row-content">
                                <label htmlFor="name">Full Name</label>
                                <input className="input" type="text" id={this.state.name} name="name" value={this.state.name} onChange={(e)=>{this.handleNameChange(e)}} placeholder="" required/>
                                <error-output className="text-error" htmlFor="error">{this.state.textError}</error-output>
                            </div>
                            <div className="row-content">
                                <label htmlFor="number">Phone Number</label>
                                <input className="input" type="text" id={this.state.number} name="number" value={this.state.number} onChange={(e)=>{this.handleNumberChange(e)}} placeholder="" required/>
                                <error-output className="number-error" htmlFor="error">{this.state.numberError}</error-output>
                            </div>
                            <div className="row-content">
                                <label htmlFor="address">Address</label>
                                <textarea id={this.state.address} className="input" name="address" value={this.state.address} onChange={(e)=>{this.handleChange(e)}} placeholder="" ></textarea>
                            </div>
                            <div className="row-content-address">
                                <div className="state">
                                    <label htmlFor="state">State</label>
                                    <select id={this.state.State} name="State" value={this.state.State} onChange={(e)=>{this.handleChange(e)}}>
                                        <option> Select State</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
                                </div>
                                <div className="city">
                                    <label htmlFor="city">City</label>
                                    <select id={this.state.city} name="city" value={this.state.city} onChange={(e)=>{this.handleChange(e)}}>
                                        <option>Select City</option>
                                        <option value="Kanpur">Kanpur</option>
                                    </select>
                                </div>
                                <div className="zipcode">
                                    <label htmlFor="zipcode">ZipCode</label>
                                    <input className="zipcode-input" type="text" id={this.state.zipCode} required value={this.state.zipCode} onChange={(e)=>{this.handleChange(e)}} placeholder="" name="zipCode"/>
                                </div>
                            </div>
                            <div className="button">
                                <button type="submit" className="addButton button-content" >Add</button>
                                <button type="reset" className="reset-button button-content" >Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(AddressBookForm)