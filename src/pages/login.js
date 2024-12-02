export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      {/* Form to collect user credentials */}
      <div>
        <form>
          <div className="bg-blue">
            <label>Email:</label>
            <input type="email" placeholder="Email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
