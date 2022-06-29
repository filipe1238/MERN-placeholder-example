import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const Account = (props) => (
    <tr>
        <td>{props.account.email}</td>
        <td>{props.account.password}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.account._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    if (window.confirm('Delete the account?')) { props.deleteAccount(props.account._id) }
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);



export default function StudyPage() {
    const [accounts, setAccounts] = useState([]);

    // This method fetches the accounts from the database.
    useEffect(() => {
        async function getAccounts() {
            const response = await fetch(`http://localhost:5000/account/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            console.log("data updated")
            const accounts = await response.json();
            setAccounts(accounts);
        }

        getAccounts();

        return;
    }, [accounts.length]);

    // This method will delete a account
    async function deleteAccount(id) {
        await fetch(`http://localhost:5000/account/${id}`, {
            method: "DELETE"
        });

        const newAccounts = accounts.filter((el) => el._id !== id);
        setAccounts(newAccounts);
    }

    // This method will map out the accounts on the table
    function accountList() {
        return accounts.map((account) => {
            return (
                <Account
                    account={account}
                    deleteAccount={() => deleteAccount(account._id)}
                    key={account._id}
                />
            );
        });
    }

    // This following section will display the table with the accounts of individuals.
    return (
        <div>
            <h3>Account List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>E-mail</th>
                        <th>Password</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{accountList()}</tbody>
            </table>
        </div>
    );
}
