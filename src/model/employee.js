import { ObjectID } from 'bson';

require('datejs');

class Employee {
    constructor(params = {}) {
        this._id = params._id || new ObjectID().toString();
        this._firstName = params.firstName || '';
        this._lastName = params.lastName || '';
        this._email = params.email || '';
        this._groups = params.groups || [];
        this._workingSince = params.workingSince;
        this._balance = params.balance;
    }

    setProp = (propName, value) => {
        switch(propName) {
            case 'firstName': this._firstName = value; break;
            case 'lastName': this._lastName = value; break;
            case 'email': this._email = value; break;
            case 'groups': this._groups = value; break;
            case 'workingSince': this._workingSince = value; break;
            case 'balance': this._balance = value; break;
            default:
        }
    }

    get id() { return this._id };
    get firstName() { return this._firstName || '' };
    get lastName() { return this._lastName || '' };
    get fullName() { return (this._firstName + ' ' + this._lastName) || '' };
    get email() { return this._email };
    get groups() { return this._groups };
    get groupsFormatted() {
        return this._groups.sort().reduce((s, g) => s += `${g} `, '')
    };
    get workingSince() { return this._workingSince };
    get workingSinceFormatted() {
        return new Date(this._workingSince).toString('dd MMM yyyy');
    }
    get balance() { return this._balance };
    get balanceFormatted() {
        if (!this._balance) {
            return '0 Days';
        }
        const days = Math.floor(this._balance / 8);
        const hours = this._balance % 8;
        return hours ? `${days} Days ${hours} Hours` : `${days} Days`;
    }
    get obj() {
        return {
            _id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            groups: this.groups,
            workingSince: this.workingSince || 0,
            balance: this.balance
        }
    };

    validate = () => Employee.validateName(this._firstName)
        && Employee.validateName(this._lastName)
        && Employee.validateEmail(this._email)
        && Employee.validateGroups(this._groups);

    static validateProp = (propName, value) => {
        switch(propName) {
            case 'firstName':
            case 'lastName': return Employee.validateName(value);
            case 'email': return Employee.validateEmail(value);
            case 'groups': return Employee.validateGroups(value);
            default: return true;
        }
    }

    static validateName = (name) => /^[a-zA-Z ]+$/.test(name);

    static validateEmail = (email) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

    static validateGroups = (groups) =>
        groups.reduce((res, group) => Employee.validateGroup(group) && res, true);

    static validateGroup = (group) => /^[\w.-]+$/.test(group);
}

export default Employee;
