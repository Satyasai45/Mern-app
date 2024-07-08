import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  // Get Single User Data
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        console.log("Fetched user", result);
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("An unexpected error occurred while fetching user data");
    }
  };

  // Send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        navigate("/all");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An unexpected error occurred while updating user data");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className='container my-2'>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Edit the data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Update;
