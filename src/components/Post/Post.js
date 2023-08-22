import React from "react";
import "./Post.css";
import { useMutation, gql } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation unpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, { data, loading, error }] = useMutation(PUBLISH_POST);
  const [
    unpublishPost,
    { data: unpublishData, loading: unpublishLoading, error: unpublishError },
  ] = useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(Number(date));

  if (unpublishLoading) return <p>Loading...</p>;
  if (unpublishData) return <p>Unpublished</p>;
  if (unpublishError) return <p>Error</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data && data);

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => {
            publishPost({
              variables: { postId: id },
            });
          }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({
              variables: { postId: id },
            });
          }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
