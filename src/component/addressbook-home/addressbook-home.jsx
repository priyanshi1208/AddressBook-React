import React from 'react';
import AddressBookService from '../../service/adddressbookService';
import '../addressbook-home/addressbook-home.scss';
import add from '../../images/icons/add-24px.svg';
import Display from '../display-home/display-home';
import logo from '../../images/images/logo.png';
import {withRouter} from 'react-router-dom';

class AddressBookHome extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addressbookData:[],
            personArray:[]
        }
        this.addressBookService = new AddressBookService();
    }
    componentDidMount(){
        this.getPersonList();
    }
    getPersonList(){
        this.addressBookService.getAllPerson()
        .then(response=>{
            let responseText=response.data;
            console.log("Response:",response);
            this.setState({
                addressbookData:responseText.data,
                personArray:responseText.data
            });
        })
        .catch(error=>{
            console.log("Error in getting addressbook data"+JSON.stringify(error));
        })
    }
    render(){
        return(
            <div>
                <header 
                className="header-content">
                    <div 
                    className="logo-content">
                        <img 
                        className="logo-img"src={logo} alt="addressbook logo"/>
                        <div>
                            <span 
                            className="address-text">ADDRESS</span><br></br>
                            <span 
                            className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div 
                className="main-content">
                    <div 
                    className="main-header">
                        <div 
                        className="person-detail-text">
                            Person Details <div 
                            className="emp-count"></div>
                        </div>
                        <a href="/form" 
                        className="add-button">
                        <img 
                        className="add-img" src={add} alt=""/>Add Person</a>
                    </div> 
                    <div className="table-main">
                        <table id ="display" className="table">
                            <Display addressbookData = {this.state.addressbookData} />
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(AddressBookHome)