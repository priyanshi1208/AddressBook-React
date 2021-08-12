import configuration from '../configuration/configuration.js';
import AxiosService from '../service/axios';
class AddressBookService{
    url=configuration.url;
    addPerson(data){
        return AxiosService.postService(`${this.url}addressbook/post`,data);
    }
    getAllPerson() {
        console.log(AxiosService.getService(`${this.url}addressbook/get`));
        return AxiosService.getService(`${this.url}addressbook/get`);
    }
    deletePerson(id){
        return AxiosService.deleteService(`${this.url}addressbook/delete/${id}`);
    }
    getPersonById(id){
        return AxiosService.getService(`${this.url}addressbook/get/${id}`);
    }
    updatePerson(person,id){
        return AxiosService.putService(`${this.url}addressbook/put/${id}`,person)
    }
}
export default AddressBookService