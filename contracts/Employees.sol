// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

contract Employees {

    constructor () {
        owner = payable (msg.sender);
    }

    address payable owner;


    modifier onlyAdmin {
        require(owner == msg.sender, "Not the admin");
        _;
    }

    struct Employee {
        uint256 id;
        string name;
        string location;
        string startDate;
        address account;
        string company;
        address department;
    }
 
    uint256 public employeeId;

    //  Employee array, called employees
    Employee[] public employees;

    //Events
    event employeeCreated (uint id, string name, string location, string startDate, address account, string company, address department);
    event employeeDeleted (uint id, string name, address account);

    function createEmployee (string memory _name, string memory _location, string memory _startDate, address _account, string memory _company, address _department) public {   
        require (_department != _account, "Department and Worker address can't be the same. Pick another address.");
        require (msg.sender != _account, "An employee can't register themself.");    
        uint _id = employeeId++;
        
        Employee memory employee = Employee({
            id: _id,
            name: _name,
            location: _location,
            startDate: _startDate,
            account: _account,
            company: _company,
            department: _department
        });

            employees.push(employee);
            
            emit employeeCreated (
                employee.id, 
                employee.name, 
                employee.location,
                employee.startDate, 
                employee.account,
                employee.company,
                employee.department
            );
    }

    function getEmployee(uint _index) public view returns (uint256 id, string memory name, string memory startDate, address account, address department, string memory company, string memory location) {
        Employee storage employee = employees[_index];

            id = employee.id;
            name = employee.name;
            startDate = employee.startDate;
            account = employee.account;
            department = employee.department;
            company = employee.company;
            location = employee.location;
    }

    function deleteEmployee (uint _id) internal onlyAdmin {
        string memory name = employees[_id].name;
        uint id = _id;
        address account = employees[_id].account;
        delete (employees[_id]);
        emit employeeDeleted(id, name, account);
    }

    function get(uint _id) public view returns (uint256 id, string memory name, string memory company, string memory location) {
        
            Employee memory employee = employees[_id];
            
            id = employee.id; 
            name= employee.name; 
            company = employee.company; 
            location = employee.location;        
    }


    function distroyContract() public payable onlyAdmin {
        selfdestruct(owner);
    }

}


