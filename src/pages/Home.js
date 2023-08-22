import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/signin">Signin</Link>
      </li>
      <li>
        <Link to="/profile/1">Profile</Link>
      </li>
    </ul>
  );
}
