let menuicn = document.querySelector(".menuicn"); 
        let nav = document.querySelector(".navcontainer"); 
    
        menuicn.addEventListener("click", () => { 
            nav.classList.toggle("navclose"); 
        });

        function navigateTo(page) {
    // Remove the "active" class from all nav-options
    let navOptions = document.querySelectorAll('.nav-option');
    navOptions.forEach(option => option.classList.remove('active'));

    // Find the clicked nav-option and add the "active" class
    let clickedOption = Array.from(navOptions).find(option => option.onclick && option.onclick.toString().includes(page));
    if (clickedOption) {
        clickedOption.classList.add('active');
    }

    // Redirect to the specified page
    window.location.href = page;
}

// The Add User page
// Function to open the user form
function openUserForm() {
    var userFormContainer = document.getElementById("userFormContainer");
    userFormContainer.classList.remove("hidden");
}

// Function to close the user form
function closeUserForm() {
    var userFormContainer = document.getElementById("userFormContainer");
    userFormContainer.classList.add("hidden");
}

// Function to add a user
function addUser() {
    var userName = document.getElementById("userName").value;
    var fullName = document.getElementById("fullName").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
    }


    // Perform user addition logic (AJAX request, etc.)
    console.log("Adding user:", userName, fullName, password);

    // Add your logic to interact with the server or perform client-side operations
    var newUser = {
        username: userName,
        password: password,
        fullName: fullName
    };

    // Add the user to the table
    addUserToTable(newUser);

    // Optionally, reset the form and close it after user addition
    document.getElementById("userForm").reset();
    closeUserForm();
}

// Existing functions

// Function to add a user to the table
function addUserToTable(user) {
    var usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

    var newRow = usersTable.insertRow();

    // Populate cells with user information
    for (var prop in user) {
        if (prop === "username" || prop === "password" || prop === "fullName") {
            var cell = newRow.insertCell();
            cell.innerHTML = user[prop];
        }
    }

    // Add an "Edit" button in the last column
    var editCell = newRow.insertCell();
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        openEditUserForm(user);
    };
    editCell.appendChild(editButton);

    // Add a "Delete" button in the last column
    var deleteCell = newRow.insertCell();
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteUser(user);
    };
    deleteCell.appendChild(deleteButton);

    // Display the table if it's not already displayed
    displayUsersTable();
}

// Function to open the edit user form
function openEditUserForm(user) {
    var editUserFormContainer = document.getElementById("editUserFormContainer");
    var editUsernameInput = document.getElementById("editUsername");
    var editPasswordInput = document.getElementById("editPassword");
    var editFullNameInput = document.getElementById("editFullName");

    // Populate the edit form with user information
    editUsernameInput.value = user.username;
    editPasswordInput.value = user.password;
    editFullNameInput.value = user.fullName;

    // Display the edit form
    editUserFormContainer.classList.remove("hidden");
}

// Function to confirm the user information edit
function confirmEditUser() {
    var editUserFormContainer = document.getElementById("editUserFormContainer");
    editUserFormContainer.classList.add("hidden");

    // Retrieve edited information
    var editedUsername = document.getElementById("editUsername").value;
    var editedPassword = document.getElementById("editPassword").value;
    var editedFullName = document.getElementById("editFullName").value;

    // Update the table with edited information
    updateTableRow(editedUsername, editedPassword, editedFullName);
}

// Function to update the table row with edited information
function updateTableRow(username, password, fullName) {
    var usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

    // Find and update the corresponding row
    for (var i = 0; i < usersTable.rows.length; i++) {
        var row = usersTable.rows[i];
        if (row.cells[0].innerHTML === username) {
            row.cells[1].innerHTML = password;
            row.cells[2].innerHTML = fullName;
            break;
        }
    }
}


// Function to delete a user from the table
function deleteUser(user) {
    var usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

    // Find and remove the user's row
    for (var i = 0; i < usersTable.rows.length; i++) {
        var row = usersTable.rows[i];
        if (row.cells[0].innerHTML === user.username) {
            usersTable.deleteRow(i);
            break;
        }
    }

    // Perform user deletion logic (e.g., send request to the server to delete the user)
}

// Function to display the users table
function displayUsersTable() {
    var usersTableContainer = document.getElementById("usersTableContainer");

    // Display the table container
    usersTableContainer.style.display = "block";
}

// Function to open the edit user form with a pop-up effect
function openEditUserForm(user) {
    var editUserFormContainer = document.getElementById("editUserFormContainer");
    var editUsernameInput = document.getElementById("editUsername");
    var editPasswordInput = document.getElementById("editPassword");
    var editFullNameInput = document.getElementById("editFullName");

    // Populate the edit form with user information
    editUsernameInput.value = user.username;
    editPasswordInput.value = user.password;
    editFullNameInput.value = user.fullName;

    // Display the edit form with a pop-up effect
    editUserFormContainer.style.display = "block";
    editUserFormContainer.style.animation = "fadeIn 0.3s ease-in-out";
}

// Function to confirm the user information edit
function confirmEditUser() {
    var editUserFormContainer = document.getElementById("editUserFormContainer");

    // Retrieve edited information
    var editedUsername = document.getElementById("editUsername").value;
    var editedPassword = document.getElementById("editPassword").value;
    var editedFullName = document.getElementById("editFullName").value;

    // Update the table with edited information
    updateTableRow(editedUsername, editedPassword, editedFullName);

    // Hide the edit form with a fade-out effect
    editUserFormContainer.style.animation = "fadeOut 0.3s ease-in-out";
    setTimeout(function () {
        editUserFormContainer.style.display = "none";
    }, 300);
}

function deleteUser(user) {
    // Ask for confirmation before deleting
    var confirmDelete = confirm("Are you sure you want to delete the user '" + user.username + "'?");

    if (confirmDelete) {
        var usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

        // Find and remove the user's row
        for (var i = 0; i < usersTable.rows.length; i++) {
            var row = usersTable.rows[i];
            if (row.cells[0].innerHTML === user.username) {
                usersTable.deleteRow(i);
                break;
            }
        }

        // Perform user deletion logic (e.g., send request to the server to delete the user)
    }
}

// The profile 
// script/profile.js

// script/profile.js

function editProfile() {
    const elementsToEdit = document.querySelectorAll('#fullName, #email, #bio');
    
    elementsToEdit.forEach(element => {
        element.removeAttribute('readonly');
        element.classList.add('editable');
    });

    document.getElementById('fullName').focus();
    toggleButtonsVisibility();
}

function saveProfile() {
    const elementsToEdit = document.querySelectorAll('#fullName, #email, #bio');
    
    elementsToEdit.forEach(element => {
        element.setAttribute('readonly', 'true');
        element.classList.remove('editable');
    });

    toggleButtonsVisibility();
}

function toggleButtonsVisibility() {
    const editButton = document.querySelector('button[onclick="editProfile()"]');
    const saveButton = document.querySelector('button[onclick="saveProfile()"]');

    editButton.style.display = editButton.style.display === 'none' ? 'inline-block' : 'none';
    saveButton.style.display = saveButton.style.display === 'none' ? 'inline-block' : 'none';
}

// script/logout.js

function confirmLogout() {
    const confirmed = confirm("Are you sure you want to logout?");
    
    if (confirmed) {
        // Perform logout logic here
        alert("Logout successful!"); // Placeholder for actual logout logic
        // Redirect to the login page or any other desired page
        window.location.href = "login.html";
    }
}


// Function to open the add group form
function openAddGroupForm() {
    var addGroupFormContainer = document.getElementById("addGroupFormContainer");
    addGroupFormContainer.classList.remove("hidden");
}

// Function to close the add group form
function closeAddGroupForm() {
    var addGroupFormContainer = document.getElementById("addGroupFormContainer");
    addGroupFormContainer.classList.add("hidden");
}

// Function to add a group
function addGroup() {
    // Implementation for adding a group
    // ...

    // Example: Display added group in the table
    var newGroupData = {
        groupName: document.getElementById("groupName").value,
        groupDescription: document.getElementById("groupDescription").value
    };

    // Add the group to the table
    addGroupToTable(newGroupData);

    // Optionally, reset the form and close it after group addition
    document.getElementById("addGroupForm").reset();
    closeAddGroupForm();
}

// Function to add a group to the table
function addGroupToTable(group) {
    var groupsTable = document.getElementById("groupsTable").getElementsByTagName('tbody')[0];

    var newRow = groupsTable.insertRow();

    // Populate cells with group information
    for (var prop in group) {
        var cell = newRow.insertCell();
        cell.innerHTML = group[prop];
    }

    // Add an "Edit" button in the last column
    var editCell = newRow.insertCell();
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        openEditForm(group, 'group');
    };
    editCell.appendChild(editButton);

    // Add a "Delete" button in the last column
    var deleteCell = newRow.insertCell();
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteEntry(group, 'group');
    };
    deleteCell.appendChild(deleteButton);

    // Display the table if it's not already displayed
    displayGroupsTable();
}


// Function to open the edit form
function openEditForm(data, type) {
    var editFormContainer = document.getElementById("editFormContainer");
    var editForm = document.getElementById("editForm");

    // Clear existing content in the edit form
    editForm.innerHTML = '';

    // Create input fields dynamically based on data
    for (var prop in data) {
        var label = document.createElement("label");
        label.innerHTML = prop + ":";
        editForm.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.id = "edit" + prop.charAt(0).toUpperCase() + prop.slice(1); // Capitalize the first letter
        input.name = "edit" + prop.charAt(0).toUpperCase() + prop.slice(1);
        input.value = data[prop];
        editForm.appendChild(input);
    }

    // Create a button to confirm the edit
    var confirmButton = document.createElement("button");
    confirmButton.type = "button";
    confirmButton.innerHTML = "Confirm Edit";
    confirmButton.onclick = function() {
        confirmEdit(type);
    };
    editForm.appendChild(confirmButton);

    // Display the edit form
    editFormContainer.classList.remove("hidden");
}

// Function to confirm the edit
function confirmEdit(type) {
    var editFormContainer = document.getElementById("editFormContainer");

    // Retrieve edited information
    var editedData = {};
    var editForm = document.getElementById("editForm");
    var inputs = editForm.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var propName = inputs[i].name.slice(4); // Remove "edit" prefix
        editedData[propName] = inputs[i].value;
    }

    // Update the table with edited information
    updateTableRow(editedData, type);

    // Optionally, reset the form and close it after edit confirmation
    editForm.innerHTML = '';
    editFormContainer.classList.add("hidden");
}

// Function to update the table row with edited information
function updateTableRow(data, type) {
    var table;
    var tableName;
    if (type === 'user') {
        table = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
        tableName = 'usersTable';
    } else if (type === 'group') {
        table = document.getElementById("groupsTable").getElementsByTagName('tbody')[0];
        tableName = 'groupsTable';
    }

    // Find and update the corresponding row
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        if (row.cells[0].innerHTML === data[Object.keys(data)[0]]) {
            for (var prop in data) {
                row.cells[getIndexByName(tableName, prop)].innerHTML = data[prop];
            }
            break;
        }
    }
}

// Function to get the index of a column by name
function getIndexByName(tableName, columnName) {
    var table = document.getElementById(tableName);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        if (table.rows[0].cells[i].innerHTML === columnName) {
            return i;
        }
    }
    return -1;
}


// Function to delete a user/group from the table
function deleteEntry(data, type) {
    var confirmDelete = confirm("Are you sure you want to delete this " + type + "?");
    if (confirmDelete) {
        var table;
        if (type === 'user') {
            table = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
        } else if (type === 'group') {
            table = document.getElementById("groupsTable").getElementsByTagName('tbody')[0];
        }

        // Find and remove the user's/group's row
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            if (row.cells[0].innerHTML === data[Object.keys(data)[0]]) {
                table.deleteRow(i);
                break;
            }
        }
    }
}

// Function to display the users table
function displayUsersTable() {
    var usersTableContainer = document.getElementById("usersTableContainer");

    // Display the table container
    usersTableContainer.style.display = "block";
}

// Function to display the groups table
function displayGroupsTable() {
    var groupsTableContainer = document.getElementById("groupsTableContainer");

    // Display the table container
    groupsTableContainer.style.display = "block";
}

// JavaScript code in your main.js file

// Function to open the Add Group form
function openGroupForm() {
    document.getElementById('groupFormContainer').classList.remove('hidden');
}

// Function to close the Add Group form
function closeGroupForm() {
    document.getElementById('groupFormContainer').classList.add('hidden');
    // Clear form fields
    document.getElementById('groupForm').reset();
}

// Function to add a new group to the table
function addGroup() {
    // Get values from the form
    var groupName = document.getElementById('groupName').value;
    var groupDescription = document.getElementById('groupDescription').value;

    // Validate input (you can add more validation as needed)
    if (groupName.trim() === '' || groupDescription.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Add a new row to the groups table
    var table = document.getElementById('groupsTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    // Insert cells with data
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = groupName;
    cell2.innerHTML = groupDescription;
    cell3.innerHTML = '<button onclick="editGroup(this)">Edit</button>';

    // Close the Add Group form
    closeGroupForm();
}

// Function to open the Edit Group form
function editGroup(button) {
    // Get the selected row
    var row = button.parentNode.parentNode;

    // Populate the Edit Group form with the row data
    document.getElementById('editGroupName').value = row.cells[0].innerHTML;
    document.getElementById('editGroupDescription').value = row.cells[1].innerHTML;

    // Display the Edit Group form
    document.getElementById('editGroupFormContainer').classList.remove('hidden');
}

// Function to close the Edit Group form
function closeEditGroupForm() {
    document.getElementById('editGroupFormContainer').classList.add('hidden');
}

// Function to confirm the edited group details
function confirmEditGroup() {
    // Get the selected row
    var row = document.getElementById('groupsTable').getElementsByTagName('tbody')[0].rows[0];

    // Update the row data with the edited values
    row.cells[1].innerHTML = document.getElementById('editGroupName').value;
    row.cells[2].innerHTML = document.getElementById('editGroupDescription').value;

    // Close the Edit Group form
    closeEditGroupForm();
}

// Function to remove the selected group
function removeGroup(button) {
    // Get the selected row
    var row = button.parentNode.parentNode;

    // Remove the row from the table
    row.parentNode.removeChild(row);
}
