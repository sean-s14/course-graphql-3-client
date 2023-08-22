import React from "react";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.posts.map((post, index) => {
        console.log(post);
        return (
          <Post
            key={index}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            user={post.user.name}
          />
        );
      })}
    </div>
  );
}
