import React, { useState } from "react";
import Api from "../utils/api";


export default function Signup() {
	const model = {
		name: "",
		age: 0,
		number: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const [formData, setFormData] = useState(model);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState(null);
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={async e=> {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    const res = await Api({url: "/auth/signup", method: "POST", data: formData});

    console.log(res);
   
   }}>
				<input
					type="text"
					value={formData.name}
					name="name"
					placeholder="Enter full name"
					onChange={handleChange}
				/>
				<br />
				<input
					type="number"
					name="age"
					placeholder="Enter age"
					value={formData.age}
					onChange={handleChange}
				/>
				<br />
				<input
					type="tel"
					name="number"
					value={formData.number}
					onChange={handleChange}
					placeholder="Enter phone number"
				/>
				<br />
				<input
					type="email"
					value={formData.email}
					onChange={handleChange}
					name="email"
					placeholder="Enter email"
				/>
				<br />
				<input
					type="password"
					value={formData.password}
					onChange={handleChange}
					name="password"
					placeholder="Enter password"
				/>
				<br />
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm password"
					value={formData.confirmPassword}
					onChange={handleChange}
				/>

				<br />
				<button type="submit" disabled={isSubmitting}>{isSubmitting ?"Sending...":"Signup"}</button>
			</form>
		</div>
	);
}
