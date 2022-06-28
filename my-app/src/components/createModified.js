import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateModified() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordCheck: ""
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newAccount = { ...form     };
        if (!validPassword()) {
            alert("password error")
            return null
        }

        await fetch("http://localhost:5000/account/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ email: "", password: "" });
        navigate("/");
    }

    async function validPassword() {
        if (form.passwordCheck !== form.password) return false
        else return true

    }

    return (

        <form onSubmit={onSubmit}>
            <div><div className="container">
                <h3>Create New Record</h3>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        type="text"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}

                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="passwordCheck"
                        // value={form.password}
                        onChange={(e) => updateForm({ passwordCheck: e.target.value })}
                    />
                    <label htmlFor="password">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </div>
        </form>
    );
}